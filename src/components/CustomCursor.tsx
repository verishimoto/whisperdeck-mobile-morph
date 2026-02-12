import { useEffect, useState, useCallback, useRef } from 'react';

// Calculate closest point on rectangle edge with position info
function closestEdgePoint(x: number, y: number, rect: DOMRect): { 
  edgeX: number; 
  edgeY: number; 
  distance: number;
  relX: number;
  relY: number;
} {
  const clampedX = Math.max(rect.left, Math.min(x, rect.right));
  const clampedY = Math.max(rect.top, Math.min(y, rect.bottom));
  
  // If inside the rect, find closest edge
  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    const distances = [
      { edge: 'left', dist: x - rect.left, point: { x: rect.left, y } },
      { edge: 'right', dist: rect.right - x, point: { x: rect.right, y } },
      { edge: 'top', dist: y - rect.top, point: { x, y: rect.top } },
      { edge: 'bottom', dist: rect.bottom - y, point: { x, y: rect.bottom } },
    ];
    const closest = distances.reduce((a, b) => a.dist < b.dist ? a : b);
    
    // Calculate relative position (0-100%)
    const relX = ((closest.point.x - rect.left) / rect.width) * 100;
    const relY = ((closest.point.y - rect.top) / rect.height) * 100;
    
    return { 
      edgeX: closest.point.x, 
      edgeY: closest.point.y, 
      distance: closest.dist,
      relX,
      relY
    };
  }
  
  // Calculate relative position for external points
  const relX = ((clampedX - rect.left) / rect.width) * 100;
  const relY = ((clampedY - rect.top) / rect.height) * 100;
  
  return { 
    edgeX: clampedX, 
    edgeY: clampedY, 
    distance: Math.sqrt((x - clampedX) ** 2 + (y - clampedY) ** 2),
    relX,
    relY
  };
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const previousCardRef = useRef<HTMLElement | null>(null);
  const visibleCardsRef = useRef<Set<HTMLElement>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver to track visible cards (runs once)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visibleCardsRef.current.add(card);
          } else {
            visibleCardsRef.current.delete(card);
            // Clean up CSS variables when card leaves viewport
            card.style.setProperty('--edge-intensity', '0');
            card.classList.remove('ripple-active');
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '100px',
      }
    );

    // Observe all cards
    const cards = document.querySelectorAll('.liquid-glass-card');
    cards.forEach(card => {
      observerRef.current?.observe(card);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Re-observe when DOM changes - lightweight delegated approach
  useEffect(() => {
    const interval = setInterval(() => {
      const cards = document.querySelectorAll('.liquid-glass-card');
      cards.forEach(card => {
        if (!visibleCardsRef.current.has(card as HTMLElement)) {
          observerRef.current?.observe(card);
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Optimized: Only check visible cards with spatial filtering
  const updateCardEdgeIntensity = useCallback((x: number, y: number) => {
    const visibleCards = visibleCardsRef.current;
    let closestCard: HTMLElement | null = null;
    let minDist = Infinity;
    let bestRelX = 50;
    let bestRelY = 50;
    
    // Fast iteration over only visible cards
    for (const card of visibleCards) {
      const rect = card.getBoundingClientRect();
      
      // Quick bounding box check - skip cards clearly out of range (120px buffer)
      if (x < rect.left - 120 || x > rect.right + 120 ||
          y < rect.top - 120 || y > rect.bottom + 120) {
        continue;
      }
      
      const { distance, relX, relY } = closestEdgePoint(x, y, rect);
      if (distance < minDist) {
        minDist = distance;
        closestCard = card;
        bestRelX = relX;
        bestRelY = relY;
      }
    }
    
    // Calculate intensity based on distance (0-1, where 1 is closest)
    const maxDistance = 100;
    const intensity = minDist < maxDistance ? 1 - (minDist / maxDistance) : 0;
    
    // Reset previous card if different
    if (previousCardRef.current && previousCardRef.current !== closestCard) {
      previousCardRef.current.style.setProperty('--edge-intensity', '0');
      previousCardRef.current.classList.remove('ripple-active');
    }
    
    // Apply intensity and position to closest card
    if (closestCard && intensity > 0) {
      closestCard.style.setProperty('--edge-x', `${bestRelX}%`);
      closestCard.style.setProperty('--edge-y', `${bestRelY}%`);
      closestCard.style.setProperty('--edge-intensity', intensity.toString());
      
      // Toggle ripple animation class
      if (intensity > 0.1) {
        closestCard.classList.add('ripple-active');
      } else {
        closestCard.classList.remove('ripple-active');
      }
      
      previousCardRef.current = closestCard;
    } else if (previousCardRef.current) {
      previousCardRef.current.style.setProperty('--edge-intensity', '0');
      previousCardRef.current.classList.remove('ripple-active');
      previousCardRef.current = null;
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      // Use RAF for smooth performance
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: lastX, y: lastY });
          updateCardEdgeIntensity(lastX, lastY);
          rafId = 0;
        });
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, .card, a, [data-cursor="hover"], .liquid-glass-card, .liquid-glass-button, input')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, .card, a, [data-cursor="hover"], .liquid-glass-card, .liquid-glass-button, input')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      // Clean up any remaining card styles
      if (previousCardRef.current) {
        previousCardRef.current.style.setProperty('--edge-intensity', '0');
        previousCardRef.current.classList.remove('ripple-active');
      }
    };
  }, [updateCardEdgeIntensity]);

  const cursorClasses = [
    isHovering ? 'hover' : '',
    isClicking ? 'click' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      id="custom-cursor"
      className={cursorClasses}
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%) translateZ(0)',
        willChange: 'transform, left, top',
      }}
    />
  );
}

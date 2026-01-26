import { useEffect, useState, useCallback, useRef } from 'react';

// Calculate closest point on rectangle edge
function closestEdgePoint(x: number, y: number, rect: DOMRect): { edgeX: number; edgeY: number; distance: number } {
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
    return { edgeX: closest.point.x, edgeY: closest.point.y, distance: closest.dist };
  }
  
  return { 
    edgeX: clampedX, 
    edgeY: clampedY, 
    distance: Math.sqrt((x - clampedX) ** 2 + (y - clampedY) ** 2) 
  };
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const previousCardRef = useRef<HTMLElement | null>(null);

  // Apply edge intensity CSS variable to the nearest card
  const updateCardEdgeIntensity = useCallback((x: number, y: number) => {
    const cards = document.querySelectorAll('.liquid-glass-card');
    let closestCard: HTMLElement | null = null;
    let minDist = Infinity;
    let bestIntensity = 0;
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const { distance } = closestEdgePoint(x, y, rect);
      if (distance < minDist) {
        minDist = distance;
        closestCard = card as HTMLElement;
      }
    });
    
    // Calculate intensity based on distance (0-1, where 1 is closest)
    const maxDistance = 100;
    bestIntensity = minDist < maxDistance ? 1 - (minDist / maxDistance) : 0;
    
    // Reset previous card if different
    if (previousCardRef.current && previousCardRef.current !== closestCard) {
      previousCardRef.current.style.setProperty('--edge-intensity', '0');
    }
    
    // Apply intensity to closest card
    if (closestCard && bestIntensity > 0) {
      closestCard.style.setProperty('--edge-intensity', bestIntensity.toString());
      previousCardRef.current = closestCard;
    } else if (previousCardRef.current) {
      previousCardRef.current.style.setProperty('--edge-intensity', '0');
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

import { useEffect, useState, useCallback } from 'react';

// Utility to calculate distance from point to rectangle edge
function distanceToRect(x: number, y: number, rect: DOMRect): number {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}

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
  const [nearCard, setNearCard] = useState(false);
  const [edgeIntensity, setEdgeIntensity] = useState(0);
  const [burningAngle, setBurningAngle] = useState(0);

  // Check proximity to liquid glass cards and calculate "burning" effect
  const checkCardProximity = useCallback((x: number, y: number) => {
    const cards = document.querySelectorAll('.liquid-glass-card');
    let minDist = Infinity;
    let closestEdge = { edgeX: 0, edgeY: 0 };
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const { edgeX, edgeY, distance } = closestEdgePoint(x, y, rect);
      if (distance < minDist) {
        minDist = distance;
        closestEdge = { edgeX, edgeY };
      }
    });
    
    // Calculate intensity based on distance (0-1, where 1 is closest)
    const maxDistance = 80;
    const intensity = minDist < maxDistance ? 1 - (minDist / maxDistance) : 0;
    setEdgeIntensity(intensity);
    
    // Calculate angle from cursor to edge for directional burning effect
    if (intensity > 0) {
      const angle = Math.atan2(closestEdge.edgeY - y, closestEdge.edgeX - x) * (180 / Math.PI);
      setBurningAngle(angle);
    }
    
    setNearCard(minDist < 60 && minDist > 0);
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
          checkCardProximity(lastX, lastY);
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
    };
  }, [checkCardProximity]);

  const cursorClasses = [
    isHovering ? 'hover' : '',
    isClicking ? 'click' : '',
    nearCard && !isHovering ? 'near-card' : '',
    edgeIntensity > 0.5 ? 'burning' : '',
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
        '--edge-intensity': edgeIntensity,
        '--burning-angle': `${burningAngle}deg`,
      } as React.CSSProperties}
    />
  );
}

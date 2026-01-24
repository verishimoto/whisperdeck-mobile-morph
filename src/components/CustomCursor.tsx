import { useEffect, useState, useCallback } from 'react';

// Utility to calculate distance from point to rectangle edge
function distanceToRect(x: number, y: number, rect: DOMRect): number {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [nearCard, setNearCard] = useState(false);

  // Check proximity to liquid glass cards
  const checkCardProximity = useCallback((x: number, y: number) => {
    const cards = document.querySelectorAll('.liquid-glass-card');
    let minDist = Infinity;
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const dist = distanceToRect(x, y, rect);
      if (dist < minDist) minDist = dist;
    });
    
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

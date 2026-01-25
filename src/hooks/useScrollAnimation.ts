import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseScrollAnimationOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

// Hook for animating grid items with staggered delay
export function useStaggeredAnimation(itemCount: number, baseDelay: number = 50) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, Math.min(index * baseDelay, 500));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [baseDelay]);

  const registerItem = (element: HTMLElement | null, index: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-index', index.toString());
      observerRef.current.observe(element);
    }
  };

  return {
    visibleItems,
    registerItem,
    isVisible: (index: number) => visibleItems.has(index),
  };
}

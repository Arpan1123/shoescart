import { useEffect, useRef, useState, useCallback } from 'react';

export function useDriftReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if already in viewport on mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Small delay for mount animation
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.05,
        rootMargin: options.rootMargin || '50px 0px -30px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

export function useStaggerDrift(itemCount, baseDelay = 80) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  const checkVisibility = useCallback(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      setIsVisible(true);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    // Immediate check
    checkVisibility();

    // Also check after a small delay (for dynamic content loading)
    const timer = setTimeout(checkVisibility, 300);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0, rootMargin: '100px 0px 0px 0px' }
    );

    observerRef.current = observer;
    observer.observe(element);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isVisible, checkVisibility]);

  const getDelay = (index) => `${index * baseDelay}ms`;

  return [ref, isVisible, getDelay];
}

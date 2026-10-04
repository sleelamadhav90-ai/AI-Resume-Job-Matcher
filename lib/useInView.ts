import { useState, useEffect, useRef } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If reduced motion is preferred, immediately mark in view
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(element); // Trigger once
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return { ref, isInView };
}

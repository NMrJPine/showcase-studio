import { useRef, useEffect, type RefObject } from "react";
import { useParallax } from "./useParallax";

/**
 * Applies a parallax translateY to an element based on its viewport position.
 * @param speed Factor from -1 to 1. Positive = element lags behind scroll, negative = leads.
 * @returns A ref to attach to the target DOM element.
 */
export function useParallaxOffset<T extends HTMLElement = HTMLDivElement>(speed: number): RefObject<T | null> {
  const ref = useRef<T>(null);
  const offsetRef = useRef(0);

  useParallax((scrollY) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    // How far the element center is from the viewport center, normalized
    const centerY = rect.top + rect.height / 2;
    const delta = (centerY - viewH / 2) * speed;

    // Smooth the offset slightly
    offsetRef.current += (delta - offsetRef.current) * 0.3;

    el.style.transform = `translateY(${offsetRef.current}px)`;
  });

  // Clean up transform on unmount
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.style.transform = "";
      }
    };
  }, []);

  return ref;
}

import { useRef, useEffect } from "react";

type Subscriber = (scrollY: number) => void;

const subscribers = new Set<Subscriber>();
let ticking = false;
let currentScrollY = 0;
let initialized = false;

function onScroll() {
  currentScrollY = window.scrollY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      subscribers.forEach((fn) => fn(currentScrollY));
      ticking = false;
    });
  }
}

function init() {
  if (initialized) return;
  initialized = true;
  window.addEventListener("scroll", onScroll, { passive: true });
}

/** Subscribe to a shared rAF-throttled scroll listener. Returns current scrollY ref. */
export function useParallax(callback: Subscriber) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    init();
    const handler: Subscriber = (y) => cbRef.current(y);
    subscribers.add(handler);
    // fire once with current value
    handler(window.scrollY);
    return () => {
      subscribers.delete(handler);
    };
  }, []);
}

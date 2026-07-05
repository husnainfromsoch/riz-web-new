"use client";
import { useEffect, useRef } from "react";

/**
 * Drifts an element's transform with scroll position at `factor` speed.
 * Lazily attaches the scroll listener only while the element is near the
 * viewport, and no-ops entirely under prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(factor: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let listening = false;

    function apply() {
      raf = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerDelta = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-centerDelta * factor).toFixed(2)}px, 0)`;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          apply();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);

  return ref;
}

/**
 * Fades and lifts an element as it scrolls out past the top of the
 * viewport — used for hero content that should recede on scroll.
 * `distance` is the scroll distance (px) over which the effect completes.
 */
export function useScrollFadeOut<T extends HTMLElement = HTMLDivElement>(distance = 400) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let listening = false;

    function apply() {
      raf = 0;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      el.style.opacity = String(1 - progress * 0.7);
      el.style.transform = `translate3d(0, ${(-progress * 40).toFixed(2)}px, 0)`;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          apply();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [distance]);

  return ref;
}

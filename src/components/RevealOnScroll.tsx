"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` blocks up as they enter the viewport. Content is visible in the
 * server HTML; only blocks below the fold at mount are hidden, so nothing flashes.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let io: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const el = en.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "none";
            io?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
          el.style.opacity = "0";
          el.style.transform = "translateY(24px)";
          el.style.transition =
            "opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)";
          io?.observe(el);
        }
      });
    }, 80);

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  return null;
}

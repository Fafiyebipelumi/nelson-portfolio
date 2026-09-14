"use client";

/* ============================================================================
   REVEAL OBSERVER
   ----------------------------------------------------------------------------
   The entire scroll-reveal engine for the page: one IntersectionObserver,
   mounted once, that stamps `data-shown` on each target as it arrives and then
   stops watching it. Renders no DOM.

   Targets are found by attribute rather than registered by React, which is why
   the ~40 reveal wrappers on this page can stay server components.
   ========================================================================== */

import { useEffect } from "react";

const SELECTOR = "[data-reveal],[data-draw],[data-stagger]";

export function RevealObserver() {
  useEffect(() => {
    /* Reduced motion is handled entirely in CSS — don't observe at all. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll(SELECTOR);
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          /* One-shot: nothing re-animates on the way back up. */
          observer.unobserve(entry.target);
        }
      },
      {
        /* Fires a little before the element is fully in frame, so the
           movement has finished by the time it's being read. */
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

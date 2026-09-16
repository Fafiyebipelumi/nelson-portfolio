"use client";

/* ============================================================================
   REVEAL OBSERVER
   ----------------------------------------------------------------------------
   The entire scroll-reveal engine for the site: one IntersectionObserver that
   stamps `data-shown` on each target as it arrives, then stops watching it.
   Renders no DOM. Targets are found by attribute rather than registered by
   React, which is why the reveal wrappers can stay server components.

   Because this lives in the root layout, it PERSISTS across client-side
   navigations — so it must re-scan whenever the route changes (`pathname`).
   Otherwise a newly-navigated page's sections start hidden (opacity 0) and are
   never observed, staying invisible until a full refresh re-mounts everything.
   ========================================================================== */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal],[data-draw],[data-stagger]";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    /* Reduced motion is handled entirely in CSS — don't observe at all. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;

    /* Deferred a frame so the incoming route has committed its DOM before we
       query for its reveal targets. */
    const raf = window.requestAnimationFrame(() => {
      const targets = document.querySelectorAll(`${SELECTOR}`);
      if (targets.length === 0) return;

      if (!("IntersectionObserver" in window)) {
        targets.forEach((el) => el.setAttribute("data-shown", ""));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-shown", "");
            /* One-shot: nothing re-animates on the way back up. */
            observer?.unobserve(entry.target);
          }
        },
        {
          /* Fires a little before the element is fully in frame, so the
             movement has finished by the time it's being read. */
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.08,
        },
      );

      /* Only observe targets that haven't already been revealed. */
      targets.forEach((el) => {
        if (!el.hasAttribute("data-shown")) observer?.observe(el);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}

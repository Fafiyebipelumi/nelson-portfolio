"use client";

/* ============================================================================
   MOBILE MENU
   ----------------------------------------------------------------------------
   The one component on the site that uses Motion, and the one interaction that
   justifies it: an overlay needs to animate *out* as well as in, which means
   staying mounted through its own exit — exactly what AnimatePresence exists
   for and what CSS cannot do without hand-rolled transitionend bookkeeping.

   This module is code-split (see `site-header.tsx`), so Motion never touches
   the critical path. Desktop visitors never download it at all; on mobile it
   is prefetched the moment a pointer or focus lands on the menu button, so it
   is warm before the tap completes.
   ========================================================================== */

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navigation, profile } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const closeButton = useRef<HTMLButtonElement>(null);

  /* Escape to dismiss, and hold the page still behind the overlay. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="on-ink bg-ink fixed inset-0 z-60 md:hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
        >
          <div className="gutter flex h-16 items-center justify-between sm:h-20">
            <span className="text-bone font-mono text-[0.8125rem] tracking-[0.14em] uppercase">
              <span className="font-medium">{profile.firstName}</span>{" "}
              <span className="text-slate">{profile.lastName}</span>
            </span>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              className="text-bone -mr-2 flex items-center gap-2 p-2"
            >
              <span className="eyebrow">Close</span>
              <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Sections" className="gutter mt-8">
            <ul className="border-rule-ink border-t">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-rule-ink border-b"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.45,
                    delay: reduced ? 0 : 0.05 + i * 0.05,
                    ease: EASE,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="text-bone flex items-baseline gap-4 py-5 text-3xl tracking-[-0.03em]"
                  >
                    <span className="eyebrow text-signal-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <p className="text-slate mt-10 font-mono text-[0.6875rem] tracking-[0.16em] uppercase">
              {profile.location}
            </p>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

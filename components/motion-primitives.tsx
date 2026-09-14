import type { CSSProperties, ReactNode } from "react";

/* ============================================================================
   REVEAL PRIMITIVES
   ----------------------------------------------------------------------------
   These are SERVER components. They render nothing but a div and a couple of
   custom properties; the animation itself lives in CSS (see globals.css) and
   is triggered by the single observer in `reveal-observer.tsx`.

   Why not Motion for this: every reveal here is opacity plus a short
   translate, fired once. Doing that with an animation runtime meant ~40 client
   components and 49KB gzip of JavaScript on a page that is otherwise entirely
   static. CSS does the identical thing for nothing, keeps the reveals working
   if hydration is slow, and leaves Motion for the one interaction that
   actually needs choreography.

   Motion is still in the stack — see `mobile-menu.tsx`.
   ========================================================================== */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Keep small — this is polish, not choreography. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
}

/** Fades and lifts a block into place once, the first time it is seen. */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  return (
    <div
      data-reveal=""
      className={className}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Reveals children in sequence. The parent is what gets observed; children are
 * offset by their position via `nth-child`, so the sequence always plays in
 * document order regardless of how many items there are.
 *
 * Only direct children participate — wrap each one in `<StaggerItem>`.
 */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger="" className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Draws a hairline in along its length when scrolled into view — the device
 * that lets sections feel typeset rather than merely present.
 */
export function DrawRule({
  className,
  orientation = "horizontal",
  delay = 0,
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  delay?: number;
}) {
  return (
    <div
      aria-hidden="true"
      data-draw={orientation === "horizontal" ? "x" : "y"}
      className={className}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    />
  );
}

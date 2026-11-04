/* ============================================================================
   STRIPES
   ----------------------------------------------------------------------------
   The redesign's section divider: a transition band in which lines of the
   next colour thicken until they become a solid strip of it. Black into
   cream under the hero, cream into dark under the stats, and so on.

   `fade` draws the band the other way round and never goes solid: lines of
   `to` that thin out downwards over `from`, closed by a hairline. Used
   between two dark sections (quote into ventures).
   Pure CSS, decorative only.
   ========================================================================== */

const LINES = [
  // [top px, thickness px]
  [4, 1],
  [11, 1.5],
  [18, 2],
  [26, 3],
  [35, 4],
] as const;

const SOLID_FROM = 45; // px; the band is solid `to` colour from here down
const HEIGHT = 64; // px

/* Fade variant: evenly spaced lines, thickest at the top. */
const FADE_LINES = [
  [0, 4],
  [8, 3.5],
  [16, 3],
  [24, 2.5],
  [32, 2],
  [40, 1.5],
  [48, 1.25],
  [55, 1],
  [62, 1],
] as const;
const FADE_HEIGHT = 68; // px; last px is the closing hairline

export function Stripes({
  from = "#000",
  to = "var(--color-cream)",
  fade = false,
  className = "",
}: {
  /** Colour the band starts from (the section above). */
  from?: string;
  /** Colour the lines are drawn in and the band resolves into. */
  to?: string;
  /** Thinning lines with no solid strip; see header. */
  fade?: boolean;
  className?: string;
}) {
  const layer = (top: number, size: number) =>
    `linear-gradient(${to}, ${to}) 0 ${top}px / 100% ${size}px no-repeat`;

  const background = (
    fade
      ? [...FADE_LINES.map(([top, size]) => layer(top, size)), layer(FADE_HEIGHT - 1, 1), from]
      : [...LINES.map(([top, size]) => layer(top, size)), layer(SOLID_FROM, HEIGHT - SOLID_FROM), from]
  ).join(", ");

  return (
    <div
      aria-hidden="true"
      className={`w-full ${className}`}
      style={{ height: fade ? FADE_HEIGHT : HEIGHT, background }}
    />
  );
}

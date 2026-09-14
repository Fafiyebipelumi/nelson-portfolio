/* ============================================================================
   HERO VISUAL
   ----------------------------------------------------------------------------
   A server component. No canvas, no WebGL, no client JavaScript — three
   quiet layers:

     1. a masked hairline measuring grid
     2. a very slow warm light sweep
     3. a handful of sensor ticks breathing on their own cycles

   An earlier version connected those ticks into a constellation. It was cut:
   at hero scale the links ran straight through the name and read as stray
   vectors rather than intent. Isolated ticks on a grid say the same thing —
   something is quietly monitoring — without competing with the typography,
   which is what is actually supposed to carry this screen.

   Positions are percentages on absolutely-placed elements rather than SVG
   coordinates, so nothing shifts or crops unpredictably across viewports.
   ========================================================================== */

/** Deliberately placed in the negative space around the type. */
const TICKS = [
  { left: "17%", top: "15%", size: 5, delay: "0s" },
  { left: "73%", top: "21%", size: 4, delay: "1.3s" },
  { left: "89%", top: "56%", size: 6, delay: "2.6s" },
  { left: "64%", top: "77%", size: 4, delay: "0.7s" },
  { left: "35%", top: "89%", size: 5, delay: "3.4s" },
];

export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* 1 — Measuring grid, faded toward the edges so it never terminates
             on a hard line. */}
      <div
        className="hairline-grid absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(125% 90% at 58% 34%, #000 0%, rgba(0,0,0,0.5) 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(125% 90% at 58% 34%, #000 0%, rgba(0,0,0,0.5) 45%, transparent 80%)",
        }}
      />

      {/* 2 — Slow light sweep. One transform, one opacity, 14s. */}
      <div
        className="animate-sweep absolute -inset-x-1/4 -top-1/3 h-[160%] will-change-transform"
        style={{
          background:
            "radial-gradient(44% 38% at 50% 50%, rgba(232,165,77,0.13) 0%, rgba(232,165,77,0.05) 40%, transparent 72%)",
        }}
      />

      {/* 3 — Sensor ticks. */}
      {TICKS.map((tick) => (
        <span
          key={`${tick.left}-${tick.top}`}
          className="animate-pulse-node bg-signal-bright absolute rounded-full"
          style={{
            left: tick.left,
            top: tick.top,
            width: tick.size,
            height: tick.size,
            animationDelay: tick.delay,
          }}
        />
      ))}

      {/* Grounds the composition so the type always sits on a settled field. */}
      <div className="from-ink via-ink/25 absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent" />
    </div>
  );
}

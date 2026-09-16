/* ============================================================================
   WAVEFORM
   ----------------------------------------------------------------------------
   A soft audio-level motif — the podcast's one recurring graphic, shared by
   the homepage teaser and the podcast hero. Server component, pure CSS: a row
   of bars each easing on its own clock so the line breathes rather than
   marches. Silenced entirely by the global reduced-motion rule (the bars just
   hold a static height).
   ========================================================================== */

/* Per-bar [height%, animation-delay s, animation-duration s]. Hand-tuned so no
   two neighbours share a rhythm. */
const BARS: Array<[number, number, number]> = [
  [40, 0, 1.8],
  [70, 0.3, 2.2],
  [100, 0.1, 1.6],
  [55, 0.5, 2.4],
  [85, 0.2, 1.9],
  [45, 0.6, 2.1],
  [95, 0, 1.7],
  [60, 0.4, 2.3],
  [80, 0.15, 2.0],
  [35, 0.55, 1.8],
];

export function Waveform({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const color = tone === "ink" ? "bg-signal-bright/70" : "bg-signal/60";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-[3px] sm:gap-1 ${className ?? ""}`}
    >
      {BARS.map(([height, delay, duration], i) => (
        <span
          key={i}
          className={`animate-equalize w-[3px] rounded-full sm:w-1 ${color}`}
          style={{
            height: `${height}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}

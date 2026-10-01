import { podcast } from "@/lib/content";
import { Waveform } from "./waveform";

/* ============================================================================
   PODCAST COVER ART
   ----------------------------------------------------------------------------
   The show's cover art, built from the design system rather than a bitmap so it
   is identical everywhere (brief §4.2) and renders crisply at every size:
   large in the hero, medium on the latest-episode feature, small on archive
   cards. It is a square and sizes all of its own type in container units
   (`cqw`), so one component scales proportionally wherever it is placed.

   This is the launch cover. When Nelson supplies the final 1400x1400 artwork,
   swap this component's internals for a single <Image>, or pass episode cover
   art through where real episodes carry their own (see episodeCover()).
   ========================================================================== */

export function PodcastCover({
  className,
  /** `compact` drops the rail and byline, which turn to mush below ~120px, and
   *  centres the wordmark. Used for the small player badge and archive cards. */
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <div
      aria-hidden="true"
      className={`grain bg-ink relative isolate aspect-square overflow-hidden [container-type:inline-size] ${className ?? ""}`}
    >
      <div aria-hidden="true" className="grain-layer z-0" />

      {/* A faint aqua wash grounds the square without a bitmap. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(80% 70% at 28% 22%, rgba(87,203,184,0.16) 0%, transparent 62%)",
        }}
      />

      <div
        className={`relative z-10 flex h-full flex-col p-[7cqw] ${
          compact ? "justify-center" : "justify-between"
        }`}
      >
        {/* Top rail */}
        {compact ? null : (
          <div className="flex items-center justify-between">
            <span
              className="text-airwave font-mono uppercase"
              style={{ fontSize: "3cqw", letterSpacing: "0.18em" }}
            >
              The podcast
            </span>
            <Waveform tone="podcast" className="h-[7cqw]" />
          </div>
        )}

        {/* Wordmark, one word per line for a cover-art read. */}
        <div
          className="text-bone font-medium uppercase"
          style={{
            fontSize: compact ? "24cqw" : "20cqw",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="block">What</span>
          <span className="block">Comes</span>
          <span className="text-airwave block">Next</span>
        </div>

        {/* Byline */}
        {compact ? null : (
          <span
            className="text-slate font-mono uppercase"
            style={{ fontSize: "3cqw", letterSpacing: "0.16em" }}
          >
            A podcast by {podcast.host.name.replace(", PhD", "")}
          </span>
        )}
      </div>
    </div>
  );
}

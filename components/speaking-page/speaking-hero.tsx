import { speakingPage } from "@/lib/content";
import { Stripes } from "../stripes";

/* ============================================================================
   SPEAKING — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   The one light hero on the site: a pale wash (sky blue at the top-left,
   cream in the middle, spring green at the bottom-right) under a centred
   two-line serif headline, the second line in violet, and the standing
   line. The header switches to dark type over it (see site-header). Dark
   stripes resolve it into the black "Four talks" band.
   ========================================================================== */

const WASH = [
  "radial-gradient(34% 70% at 0% 0%, rgb(178 214 255 / 0.95) 0%, rgb(196 226 255 / 0.5) 45%, transparent 100%)",
  "radial-gradient(22% 55% at 0% 60%, rgb(188 236 246 / 0.75) 0%, transparent 100%)",
  "radial-gradient(40% 75% at 100% 100%, rgb(160 236 120 / 0.95) 0%, rgb(196 242 160 / 0.55) 45%, transparent 100%)",
  "radial-gradient(26% 50% at 100% 20%, rgb(220 246 196 / 0.6) 0%, transparent 100%)",
  "#fbfbec",
].join(", ");

export function SpeakingHero() {
  const H = speakingPage.hero;
  return (
    <section
      id="top"
      className="text-umber relative isolate overflow-hidden"
      style={{ background: WASH }}
    >
      <div className="gutter-tight flex flex-col items-center pt-32 pb-20 text-center lg:min-h-[36.25vw] lg:pt-[8.75rem] lg:pb-24">
        <h1
          className="animate-rise font-serif text-[clamp(2.6rem,5.62vw,5.6rem)] leading-[1.1] tracking-[-0.035em] [-webkit-text-stroke:0.6px_currentColor]"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Narrowed like every Instrument Serif heading, centred on itself. */}
          <span className="block [scale:0.88_1]">{H.headline}</span>
          <span className="block text-[#9747ff] [scale:0.88_1]">
            {H.accent}
          </span>
        </h1>
        <p
          className="animate-rise mt-5 max-w-[40.5rem] font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.38] lg:mt-6"
          style={{ animationDelay: "0.3s" }}
        >
          {H.body}
        </p>
      </div>
      <Stripes from="transparent" to="#000" />
    </section>
  );
}

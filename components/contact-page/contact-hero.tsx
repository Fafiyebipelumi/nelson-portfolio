import { contactPage } from "@/lib/content";
import { LIME_GLOW } from "../glows";
import { Stripes } from "../stripes";

/* ============================================================================
   CONTACT — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with the blue-violet and yellow-green edge glows: the centred serif
   headline and the one-line premise. Fading lines into the desks.
   ========================================================================== */

export function ContactHero() {
  const H = contactPage.hero;
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: LIME_GLOW }}
      />
      <div className="gutter-tight flex flex-col items-center pt-32 pb-20 text-center lg:pt-[12.4rem] lg:pb-[8.2rem]">
        <h1
          className="animate-rise font-serif text-[clamp(2.9rem,7.6vw,7.5rem)] leading-none tracking-[-0.04em] [scale:0.88_1] [-webkit-text-stroke:0.6px_currentColor]"
          style={{ animationDelay: "0.15s" }}
        >
          {H.headline}
        </h1>
        <p
          className="animate-rise mt-6 max-w-[64rem] font-sans xl:max-w-none xl:whitespace-nowrap text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.42] text-[#d6d2c7] lg:mt-[2.1rem]"
          style={{ animationDelay: "0.3s" }}
        >
          {H.body}
        </p>
      </div>
      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
    </section>
  );
}

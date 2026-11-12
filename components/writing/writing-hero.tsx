import { writingPage } from "@/lib/content";
import { Stripes } from "../stripes";
import { GradientPill } from "../gradient-pill";
import { LIME_GLOW } from "../glows";

/* ============================================================================
   WRITING — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with a blue-violet glow down the left edge and a broad yellow-green
   one at the right, the centred serif title and the premise, then one pill
   per published essay (newest first), each linking to it: gradient
   capsules with a dark arrow disc, taking the design's five gradients in
   turn and sized to their title, wrapping into centred rows. On phones they
   stack full width. With nothing published there are no pills, only a line
   that says so.
   ========================================================================== */

export interface EssayPill {
  title: string;
  href: string;
}

export function WritingHero({ essays }: { essays: readonly EssayPill[] }) {
  const H = writingPage.hero;
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

      <div className="gutter-tight flex flex-col items-center pt-32 pb-20 text-center lg:pt-[11.9rem] lg:pb-[8.6rem]">
        <h1
          className="animate-rise font-serif text-[clamp(3.2rem,7.45vw,7.4rem)] leading-none tracking-[-0.035em] [scale:0.88_1] [-webkit-text-stroke:0.6px_currentColor]"
          style={{ animationDelay: "0.15s" }}
        >
          {H.headline}
        </h1>
        <p
          className="animate-rise mt-7 max-w-[66.5rem] font-sans text-[1.0625rem] leading-[1.45] text-[#d6d2c7] lg:mt-[2.4rem]"
          style={{ animationDelay: "0.3s" }}
        >
          {H.body[0]} <br className="hidden lg:inline" />
          {H.body[1]}
        </p>

        {essays.length > 0 ? (
          <ul className="mt-10 flex w-full flex-col gap-3 lg:mt-[3.4rem] lg:max-w-[94vw] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-[0.6vw] lg:gap-y-4">
            {essays.map((essay, i) => {
              const tone =
                writingPage.pillTones[i % writingPage.pillTones.length];
              return (
                <li
                  key={essay.href}
                  className="animate-rise lg:max-w-[46vw] lg:min-w-[23.7vw]"
                  style={{ animationDelay: `${0.42 + Math.min(i, 8) * 0.07}s` }}
                >
                  <GradientPill
                    label={essay.title}
                    from={tone.from}
                    to={tone.to}
                    arrow={tone.arrow}
                    href={essay.href}
                    fluid
                  />
                </li>
              );
            })}
          </ul>
        ) : null}

        {essays.length === 0 ? (
          <p
            className="animate-rise text-stone mt-8 font-sans text-[1.0625rem] font-medium lg:mt-10"
            style={{ animationDelay: "0.8s" }}
          >
            {writingPage.empty}
          </p>
        ) : null}
      </div>

      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
    </section>
  );
}

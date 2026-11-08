import Image from "next/image";
import { about } from "@/lib/content";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   ABOUT — THE STORY  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band: a short amber rule over the serif heading, Nelson's story in
   the first person opening on a serif drop cap, and his signature (avatar and
   name) at the foot.
   ========================================================================== */

export function AboutStory() {
  const S = about.story;
  const [first, ...rest] = S.body;
  return (
    <section aria-labelledby="story-heading" className="bg-cream text-umber">
      <div className="gutter py-16 sm:py-20 lg:pt-[4.5rem] lg:pb-24">
        <div className="max-w-[70rem]">
          <Reveal>
            <span aria-hidden="true" className="block h-[2px] w-9 bg-[#e07b3c]" />
            <h2
              id="story-heading"
              className="mt-4 origin-left font-serif text-[clamp(2.6rem,4.2vw,3.6rem)] leading-none tracking-[-0.04em] [scale:0.88_1]"
            >
              {S.heading}
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6 font-sans text-base leading-[1.42] font-medium tracking-[-0.01em] lg:mt-12 lg:text-[1.0625rem]">
            <Reveal delay={0.05}>
              <p>
                <span
                  aria-hidden="true"
                  className="float-left mt-[0.08em] mr-3 font-serif text-[4.4em] leading-[0.72] font-normal"
                >
                  {first.charAt(0)}
                </span>
                <span className="sr-only">{first.charAt(0)}</span>
                {first.slice(1)}
              </p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={p} delay={0.05 + (i + 1) * 0.03}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 flex items-center gap-3 font-sans text-[1.0625rem] font-medium">
              <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
                <Image src={S.signature.avatar} alt="" fill sizes="32px" className="object-cover" />
              </span>
              {S.signature.name}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

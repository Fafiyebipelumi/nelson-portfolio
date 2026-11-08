import Image from "next/image";
import { Atom, Languages, Phone, Zap } from "lucide-react";
import { myhivesPage } from "@/lib/content";
import { WHAT_GLOW } from "../glows";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   MYHIVES — WHAT IT IS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with soft edge glows (amber at the top-left, teal at the right). The
   serif heading, then a vertical timeline: four outlined circular icons
   joined by a hairline, each with its line of copy. The BEEKON listening
   screen stands on the right. Fading lines in from the hero above.
   ========================================================================== */

const ICONS = {
  zap: Zap,
  atom: Atom,
  phone: Phone,
  languages: Languages,
} as const;

export function MyhivesWhat() {
  const W = myhivesPage.whatItIs;
  return (
    <section
      aria-labelledby="what-heading"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: WHAT_GLOW,
        }}
      />

      <div className="gutter-tight grid items-center gap-14 pt-16 pb-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:pt-[4.25rem] lg:pb-28">
        <div>
          <Reveal>
            <h2
              id="what-heading"
              className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.04em] [scale:0.88_1]"
            >
              {W.heading}
            </h2>
          </Reveal>

          <div className="relative mt-14 max-w-[43rem] lg:mt-24">
            <ol className="space-y-10 lg:space-y-14">
              {W.items.map((item, i) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.text} className="relative">
                    <Reveal
                      delay={i * 0.08}
                      className="relative flex items-start gap-5 lg:gap-8"
                    >
                      {/* Hairline from this circle down to the next one. */}
                      {i < W.items.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="bg-cream absolute top-12 -bottom-10 left-6 w-px lg:top-[3.1rem] lg:-bottom-14 lg:left-[1.55rem]"
                        />
                      ) : null}
                      <span className="border-cream relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 lg:size-[3.1rem]">
                        <Icon
                          className="size-5 lg:size-[1.4rem]"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <p className="pt-2 font-sans text-[1.0625rem] leading-[1.4] lg:pt-1 lg:text-[1.1875rem]">
                        {item.text}
                      </p>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <Reveal
          y={28}
          className="mx-auto w-[min(72vw,19rem)] lg:mr-[9.5vw] lg:w-[22.5vw] lg:max-w-[22rem]"
        >
          <Image
            src={W.image.src}
            alt=""
            width={W.image.width}
            height={W.image.height}
            draggable={false}
            sizes="(min-width: 1024px) 23vw, 72vw"
            className="no-save h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}

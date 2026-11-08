import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { speakingPage } from "@/lib/content";
import { ActionButton } from "../action-button";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   SPEAKING — RECENT  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band: the serif heading, four recent appearances as cards (photo
   over a coloured panel, each colour from the design, grey offset shadow),
   then the formats line on the left and the two actions on the right.
   Stripes into the footer.
   ========================================================================== */

export function SpeakingRecent() {
  const R = speakingPage.recent;
  return (
    <section aria-labelledby="recent-heading" className="bg-cream text-umber">
      <div className="gutter-tight pt-16 pb-20 lg:pt-[5.4rem] lg:pb-[8.1rem]">
        <Reveal>
          <h2
            id="recent-heading"
            className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.045em] [scale:0.88_1]"
          >
            {R.heading}
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-[2.6rem] lg:grid-cols-4 lg:gap-[1.2rem]">
          {R.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <article
                className="flex h-full flex-col overflow-hidden rounded-[4px] shadow-[4px_4px_0_0_#6f6b63] lg:min-h-[28.1rem]"
                style={{ backgroundColor: item.tone }}
              >
                <div className="relative aspect-[324/186] shrink-0">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    className="no-save object-cover"
                  />
                </div>
                <div className="px-4 pt-[1.05rem] pb-6">
                  <h3 className="font-sans text-[1.3rem] leading-[1.18] font-semibold tracking-[-0.01em] lg:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-[1.0625rem] leading-[1.3] tracking-[0.01em]">
                    {item.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-col gap-8 lg:mt-[2.9rem] lg:flex-row lg:items-center lg:justify-between">
            <p className="font-sans text-[1.25rem] leading-[1.15] font-medium tracking-[-0.01em] lg:text-[1.4rem]">
              {R.note.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-[1.1rem]">
              <ActionButton
                href={R.ctas.enquire.href}
                variant="ink"
                className="lg:px-[1.9rem]"
              >
                {R.ctas.enquire.label}
                <ArrowUpRight
                  className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </ActionButton>
              <ActionButton
                href={R.ctas.kit.href}
                variant="paper"
                className="lg:px-[1.25rem]"
              >
                {R.ctas.kit.label}
              </ActionButton>
            </div>
          </div>
        </Reveal>
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}

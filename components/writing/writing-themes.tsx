import { ArrowUpRight } from "lucide-react";
import { writingPage } from "@/lib/content";
import { ActionButton } from "../action-button";
import { WHAT_GLOW } from "../glows";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   WRITING — THEMES  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with amber and teal edge glows. A three-column grid: the serif
   "Themes" heading takes the first cell and the five theme cards fill the
   rest (colour cards with a serif title and the grey offset shadow). The
   two actions sit under it, starting at the middle column. Fading lines
   into the footer.
   ========================================================================== */

export function WritingThemes({ latestHref }: { latestHref: string }) {
  const T = writingPage.themes;
  const C = writingPage.ctas;
  const arrow = (
    <ArrowUpRight
      className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
  return (
    <section
      aria-labelledby="themes-heading"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: WHAT_GLOW }}
      />

      <div className="gutter-tight pt-16 pb-20 lg:pt-[7.4rem] lg:pb-[7.9rem]">
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
          <StaggerItem>
            <h2
              id="themes-heading"
              className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.045em] [scale:0.88_1] lg:pt-2"
            >
              {T.heading}
            </h2>
          </StaggerItem>
          {T.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div
                className="text-umber flex h-full min-h-[6.6rem] items-center rounded-[4px] px-4 py-5 shadow-[4px_4px_0_0_#6f6b63]"
                style={{ backgroundColor: item.tone }}
              >
                <p className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(1.6rem,2.05vw,1.85rem)] leading-[1.05] tracking-[-0.02em] [scale:0.88_1] [-webkit-text-stroke:0.5px_currentColor]">
                  {item.title}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-4 lg:mt-10 lg:ml-[calc((100%-4rem)/3+2rem)] lg:gap-[0.9rem]">
            <ActionButton href={latestHref} variant="light">
              {C.latest.label}
              {arrow}
            </ActionButton>
            <ActionButton href={C.subscribe.href} variant="dark">
              {C.subscribe.label}
              {arrow}
            </ActionButton>
          </div>
        </Reveal>
      </div>

      <Stripes from="#000" to="#5e5a51" fade />
    </section>
  );
}

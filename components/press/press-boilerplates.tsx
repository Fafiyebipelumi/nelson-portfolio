import Image from "next/image";
import { pressPage } from "@/lib/content";
import { CopyButton } from "../copy-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   PRESS — COMPANY BOILERPLATES  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band in from the edges (4.5vw): a 2 x 2 grid of MyHives, BEFORE,
   15Wins and Joble, each its logo (dark versions of the venture logos; BEFORE
   as a bold wordmark), its one-paragraph boilerplate and a Copy button. The
   second column starts 52.4% across, as in the design. Stripes resolve into
   a dark strip above the stats.
   ========================================================================== */

export function PressBoilerplates() {
  return (
    <section
      id="boilerplates"
      aria-label="Company boilerplates"
      className="bg-cream text-umber scroll-mt-24"
    >
      <Stripes from="#000" to="var(--color-cream)" />
      <div className="grid gap-14 px-[1.375rem] pt-12 pb-16 sm:px-10 lg:grid-cols-[52.4%_minmax(0,1fr)] lg:gap-x-0 lg:gap-y-[3.6rem] lg:px-[4.5vw] lg:pt-10 lg:pb-[2.6rem]">
        {pressPage.boilerplates.map((item, i) => (
          <Reveal
            key={item.name}
            delay={(i % 2) * 0.06}
            className="max-w-[38rem] lg:pr-10"
          >
            <div className="flex h-[2.3rem] items-center">
              {item.logo ? (
                <Image
                  src={item.logo.src}
                  alt={item.name}
                  width={item.logo.width}
                  height={item.logo.height}
                  unoptimized
                  draggable={false}
                  className="no-save h-auto max-h-full"
                  style={{ width: item.logo.display }}
                />
              ) : (
                <h2 className="font-sans text-[2.15rem] leading-none font-bold tracking-[-0.01em]">
                  {item.name}
                </h2>
              )}
            </div>
            <p className="mt-4 font-sans text-[1.0625rem] leading-[1.45] tracking-[0.005em]">
              {item.body}
            </p>
            <div className="mt-5">
              <CopyButton text={item.body} variant="ink" />
            </div>
          </Reveal>
        ))}
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}

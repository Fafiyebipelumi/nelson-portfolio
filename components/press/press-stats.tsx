import Image from "next/image";
import { pressPage } from "@/lib/content";
import { Stagger, StaggerItem } from "../motion-primitives";
import { Avatars } from "../stats-strip";
import { Stripes } from "../stripes";

/* ============================================================================
   PRESS — FIGURES  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   The homepage stats strip, extended to six figures for journalists: the
   founders' avatars, the globe, then the plain figures, spread across one
   row on desktop (wrapping on smaller screens). Each figure can carry its
   source as small print (copy v3.1). Stripes into the media-contact band.
   ========================================================================== */

export function PressStats() {
  return (
    <section aria-label="Figures" className="bg-cream text-umber">
      <div className="px-[1.375rem] py-14 sm:px-10 lg:px-[5vw] lg:py-[4.6rem]">
        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between lg:gap-x-4">
          {pressPage.stats.map((item) => (
            <StaggerItem
              key={item.value}
              className="flex items-center gap-4 lg:shrink-0"
            >
              {item.visual === "avatars" ? <Avatars /> : null}
              {item.visual === "globe" ? (
                <Image
                  src="/globe.svg"
                  alt=""
                  width={52}
                  height={52}
                  unoptimized
                  className="size-11 shrink-0 lg:size-[3.25rem]"
                />
              ) : null}
              <div title={item.source ? `Source: ${item.source}` : undefined}>
                <p className="font-sans text-[clamp(2.25rem,3.5vw,3.15rem)] leading-none font-medium tracking-[-0.03em]">
                  {item.value}
                </p>
                <p className="mt-2 max-w-[13rem] font-sans text-[0.9375rem] leading-snug lg:max-w-[10.6rem] lg:text-[1.0625rem]">
                  {item.label}
                </p>
                {item.source ? (
                  <p className="text-umber/70 mt-1.5 max-w-[13rem] font-sans text-[0.75rem] leading-snug">
                    Source: {item.source}
                  </p>
                ) : null}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}

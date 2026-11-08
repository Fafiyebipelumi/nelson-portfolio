import Image from "next/image";
import { homeStats } from "@/lib/content";
import { Stagger, StaggerItem } from "./motion-primitives";
import { Stripes } from "./stripes";

/* ============================================================================
   HOME — STATS STRIP  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band of four figures, centred in a row on desktop and a 2 x 2 grid on
   small screens. The first figure leads with overlapping founder avatars, the
   second with a globe; the band then resolves into the dark section below
   through the striped divider. Each figure carries its source as small print
   (and a hover tooltip), per copy v3.1; touch screens have no hover, so the
   small print is what carries it there.
   ========================================================================== */

export function StatsStrip() {
  return (
    <section className="bg-cream text-umber">
      <div className="gutter py-14 sm:py-16 lg:py-[4.5rem]">
        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:flex lg:items-center lg:justify-center lg:gap-x-[clamp(2.25rem,4vw,4.5rem)]">
          {homeStats.items.map((item) => (
            <StaggerItem key={item.value} className="flex items-center gap-4">
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
                <p className="font-sans text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none font-medium tracking-[-0.03em]">
                  {item.value}
                </p>
                <p className="mt-2 max-w-[14rem] font-sans text-[0.9375rem] leading-snug lg:text-base">
                  {item.label}
                </p>
                {item.source ? (
                  <p className="text-umber/70 mt-1.5 max-w-[14rem] font-sans text-[0.75rem] leading-snug">
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

export function Avatars() {
  return (
    <div className="flex shrink-0">
      {homeStats.avatars.map((person, i) => (
        <span
          key={person.src}
          className={`border-cream relative size-11 overflow-hidden rounded-full border-2 lg:size-12 ${
            i > 0 ? "-ml-3" : ""
          }`}
        >
          <Image src={person.src} alt={person.name} fill sizes="48px" className="object-cover" />
        </span>
      ))}
    </div>
  );
}

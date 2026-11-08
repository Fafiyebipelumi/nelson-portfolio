import Image from "next/image";
import { about } from "@/lib/content";
import { Stagger, StaggerItem } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   ABOUT — EARLIER WORK / EDUCATION / RECOGNITION  (Figma, November 2026)
   ----------------------------------------------------------------------------
   Three columns on the dark ground between hairline rules, each led by a
   coloured icon, a serif heading and a paragraph. Fading lines above
   and below, as between the other dark sections.
   ========================================================================== */

/* The designer's icon exports, at their native sizes (all 48px tall). */
const ICONS = {
  work: { src: "/home-work.svg", width: 48, height: 48 },
  education: { src: "/education-filled.svg", width: 46, height: 48 },
  recognition: { src: "/solid_award.svg", width: 36, height: 48 },
} as const;

export function AboutDetails() {
  return (
    <section aria-label="Earlier work, education and recognition" className="bg-umber text-cream">
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
      <div className="gutter">
        <Stagger className="grid divide-y divide-[#5e5a51] md:grid-cols-3 md:divide-x md:divide-y-0 md:border-r md:border-[#5e5a51]">
          {about.details.map((item) => {
            const icon = ICONS[item.icon];
            return (
              <StaggerItem
                key={item.heading}
                className="py-10 md:px-[clamp(1rem,1.6vw,1.5rem)] md:py-8 md:first:pl-0"
              >
                <Image
                  src={icon.src}
                  alt=""
                  width={icon.width}
                  height={icon.height}
                  unoptimized
                  className="h-10 w-auto lg:h-12"
                />
                <h2 className="mt-6 origin-left font-serif text-[clamp(1.5rem,1.8vw,1.75rem)] leading-none tracking-[-0.02em] [scale:0.88_1]">
                  {item.heading}
                </h2>
                <p className="text-sand mt-5 max-w-[30rem] font-sans text-base leading-[1.45] md:text-[0.9375rem]">
                  {item.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
    </section>
  );
}

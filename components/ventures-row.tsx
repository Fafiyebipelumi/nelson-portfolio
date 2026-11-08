import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { homeVentures } from "@/lib/content";
import { ActionButton } from "./action-button";
import { Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   HOME — VENTURES ROW  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Three equal columns on the dark ground, split by hairlines: logo, a serif
   line, a short description, then the role and an "Explore" button pinned to
   the bottom so the three rows line up. Stacks with horizontal rules on small
   screens.

   On /ventures (`toPages`) each button leads to the venture's own page on
   this site instead of the company's website.
   ========================================================================== */

export function VenturesRow({ toPages = false }: { toPages?: boolean }) {
  return (
    <section id="ventures" aria-label="Ventures" className="bg-umber text-cream">
      <Stagger className="grid divide-y divide-[#5e5a51] md:grid-cols-3 md:divide-x md:divide-y-0">
        {homeVentures.map((venture) => (
          <StaggerItem
            key={venture.id}
            className="flex flex-col px-5 py-12 sm:px-8 md:px-[clamp(1rem,1.6vw,1.5rem)] md:py-[clamp(2.5rem,3.6vw,3.25rem)] xl:pr-5 xl:pl-14"
          >
            <div className="flex h-[2.9rem] items-center">
              <Image
                src={venture.logo.src}
                alt={venture.name}
                width={venture.logo.width}
                height={venture.logo.height}
                unoptimized
                className="h-auto max-h-full w-auto max-w-[11rem]"
              />
            </div>

            {/* Width is divided by the 0.88 squeeze so lines wrap at the
                visible column edge, not 12% short of it. */}
            <h3 className="mt-6 w-[calc(100%/0.88)] origin-left font-serif text-[clamp(1.5rem,1.85vw,1.8rem)] leading-[1.05] [scale:0.88_1]">
              {venture.tagline}
            </h3>

            <p className="text-sand mt-5 max-w-[34rem] font-sans text-base leading-[1.45] tracking-[-0.01em] md:text-[0.9375rem] lg:text-base">
              {venture.body}
            </p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-4 pt-8 xl:flex-nowrap">
              <p className="font-sans text-[0.9375rem] font-medium tracking-[0.01em] uppercase xl:text-[0.9375rem] xl:whitespace-nowrap">
                {venture.role}
              </p>
              <ActionButton href={toPages ? `/${venture.id}` : venture.cta.href} variant="dark" size="sm">
                {venture.cta.label}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </ActionButton>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

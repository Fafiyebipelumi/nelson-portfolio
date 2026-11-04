import Image from "next/image";
import { homeHiveQuote } from "@/lib/content";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   HOME — HIVE QUOTE  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   A full-bleed band over the B.png glow background (the same image as the
   hero), stretched rather than cropped so both side glows survive on narrow
   screens: one large centred quote, signed with Nelson's avatar.
   ========================================================================== */

export function HiveQuote() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-cream">
      <Image
        src="/B.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-fill"
      />

      <figure className="gutter mx-auto flex max-w-[62rem] flex-col items-center py-24 text-center sm:py-28 lg:py-[8.75rem]">
        <Reveal className="w-full">
          <blockquote>
            <p className="mx-auto max-w-[47rem] font-sans text-[clamp(1.75rem,3.05vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.03em]">
              &ldquo;{homeHiveQuote.text}&rdquo;
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.08}>
          <figcaption className="mt-8 flex items-center gap-3 lg:mt-10">
            <span className="relative size-7 shrink-0 overflow-hidden rounded-full">
              <Image
                src={homeHiveQuote.attribution.avatar}
                alt=""
                fill
                sizes="28px"
                className="object-cover"
              />
            </span>
            <span className="font-sans text-[1.0625rem] font-medium lg:text-[1.2rem]">
              {homeHiveQuote.attribution.name}
            </span>
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}

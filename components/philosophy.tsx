import Image from "next/image";
import { philosophy } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   02 — POSITION / PHILOSOPHY
   ----------------------------------------------------------------------------
   The manifesto beat. Type carries it: one large statement with a single
   serif italic word doing the emphasis, then three short paragraphs set in a
   narrow measure off to the right, the way a magazine would run a standfirst.
   ========================================================================== */

export function Philosophy() {
  return (
    <Section id="position" tone="paper">
      <SectionBody>
        <SectionLabel index="02" label={philosophy.eyebrow} />

        <Reveal>
          <h2 className="text-display max-w-5xl font-medium">
            {philosophy.headline.before}
            <span className="text-signal font-serif italic">
              {philosophy.headline.emphasis}
            </span>
            {philosophy.headline.after}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          {/* Portrait — the formal frame, warmed to match the palette. */}
          <Reveal className="lg:col-span-4" y={28}>
            <figure>
              <div className="border-rule relative aspect-[4/5] w-full max-w-xs overflow-hidden border lg:max-w-none">
                <Image
                  src="/nelson-ta.jpeg"
                  alt="Nelson T. Ajulo"
                  fill
                  sizes="(min-width: 1024px) 30vw, 320px"
                  loading="lazy"
                  className="object-cover object-[50%_18%] grayscale-[0.92] contrast-[1.04] sepia-[0.12]"
                />
              </div>
              <figcaption className="eyebrow text-mute mt-4">
                NELSON T. AJULO, PhD
              </figcaption>
            </figure>
          </Reveal>

          {/* Reading matter */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="bg-rule-strong mb-10 h-px w-full lg:mb-12" />
            <div className="space-y-7 sm:space-y-8">
              {philosophy.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p
                    className={
                      i === 0
                        ? "text-lead text-charcoal"
                        : "text-graphite text-base leading-relaxed sm:text-[1.0625rem]"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}

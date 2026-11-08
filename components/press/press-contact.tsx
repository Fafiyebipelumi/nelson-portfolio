import { pressPage } from "@/lib/content";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   PRESS — MEDIA CONTACT  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Two serif lines on the dark ground: the media address (a mailto link with
   the subject filled in) and the subject line to use. Fading lines into the
   footer.
   ========================================================================== */

export function PressContact() {
  const C = pressPage.contact;
  return (
    <section
      id="media-contact"
      aria-label="Media contact"
      data-tone="ink"
      className="on-ink bg-umber text-cream scroll-mt-24"
    >
      <div className="gutter-tight pt-16 pb-14 lg:pt-[5.4rem] lg:pb-[4.1rem]">
        <Reveal>
          <p className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.2rem,4.15vw,4rem)] leading-[1.05] tracking-[-0.02em] [scale:0.88_1]">
            <span className="block">
              Media enquiries:{" "}
              <a
                href={`mailto:${C.email}?subject=${encodeURIComponent(C.subject)}`}
                className="decoration-cream/40 underline-offset-[0.14em] transition-colors hover:underline"
              >
                {C.email}
              </a>
            </span>
            <span className="block">Subject line: {C.subject}</span>
          </p>
        </Reveal>
      </div>
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import { before } from "@/lib/content";
import { ActionButton } from "../action-button";
import { Reveal } from "../motion-primitives";
import { CopyEmail } from "./copy-email";

/* ============================================================================
   BEFORE — GUESTS AND SPONSORS
   ----------------------------------------------------------------------------
   Two columns. Left (#apply, the target of "Apply to be a guest" on the
   homepage): how to put yourself or someone forward, with the subject line
   and a Copy email button. Right: sponsorship terms and the deck request.
   ========================================================================== */

export function BeforeSeatSponsor() {
  const S = before.seat;
  const P = before.sponsor;
  return (
    <section aria-label="Guests and sponsors" className="bg-umber text-cream">
      <div className="gutter grid gap-16 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-[7.5rem]">
        <Reveal>
          <div id="apply" className="scroll-mt-28">
            <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
              {S.headline}
            </h2>
            <p className="text-sand mt-6 font-sans text-[1.0625rem] sm:text-base leading-[1.5] lg:text-[1.0625rem]">
              {S.body}
              <span className="text-cream mt-1 block font-medium">Subject line: {S.subject}</span>
            </p>
            <div className="mt-7">
              <CopyEmail email={S.email} subject={S.subject} label={S.cta} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div id="sponsor" className="scroll-mt-28">
            <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
              {P.headline}
            </h2>
            <p className="text-sand mt-6 font-sans text-[1.0625rem] sm:text-base leading-[1.5] lg:text-[1.0625rem]">{P.body}</p>
            <div className="mt-7">
              <ActionButton href={P.cta.href} variant="dark" size="sm">
                {P.cta.label}
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </ActionButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

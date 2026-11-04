import Image from "next/image";
import { before } from "@/lib/content";
import { ActionButton, PlayIcon } from "../action-button";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   BEFORE — TRAILER BAND
   ----------------------------------------------------------------------------
   Glow band (B.png) with the season date, a waveform whose first half is
   "played" (cream) and second half still to come (grey), and the trailer
   button. The bars breathe gently; reduced motion holds them still.

   Until a trailer URL is set in content.ts the button renders inert and says
   so to assistive tech, rather than linking nowhere.
   ========================================================================== */

/* One "word" of the waveform, repeated. Heights are fractions of the row. */
const SHAPE = [0.22, 0.6, 1, 0.6, 0.22];
const BARS = Array.from({ length: 6 }, () => SHAPE).flat();

export function BeforeTrailer() {
  const T = before.trailer;
  return (
    <section aria-label="Trailer" className="relative isolate overflow-hidden bg-black text-cream">
      <Image src="/B.png" alt="" fill sizes="100vw" className="-z-10 object-fill" />

      <div className="gutter flex flex-col items-center py-20 text-center sm:py-24 lg:py-[6.5rem]">
        <Reveal>
          <h2 className="font-sans text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium tracking-[-0.03em]">
            {T.title}
          </h2>
        </Reveal>

        <div aria-hidden="true" className="mt-8 flex h-[4.5rem] items-center gap-[clamp(0.45rem,1vw,0.85rem)] sm:h-[5.5rem]">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`before-bar w-[clamp(0.35rem,0.7vw,0.6rem)] rounded-full ${
                i < BARS.length / 2 ? "bg-cream" : "bg-[#5d5b57]"
              }`}
              style={{
                height: `${h * 100}%`,
                animationDelay: `${(i % 5) * 0.14 + Math.floor(i / 5) * 0.09}s`,
              }}
            />
          ))}
        </div>

        <Reveal delay={0.08} className="mt-8">
          {T.href ? (
            <ActionButton href={T.href} variant="dark" size="sm">
              {T.cta}
              <span className="[&_circle]:fill-cream [&_path]:fill-umber">
                <PlayIcon />
              </span>
            </ActionButton>
          ) : (
            <span
              aria-disabled="true"
              title="Trailer coming soon"
              className="inline-flex cursor-default items-center gap-2.5 rounded-[7px] border border-cream/70 bg-umber px-5 py-2.5 font-sans text-[0.9375rem] font-medium shadow-[4px_4px_0_0_#ece5cf]"
            >
              {T.cta}
              <span className="[&_circle]:fill-cream [&_path]:fill-umber">
                <PlayIcon />
              </span>
              <span className="sr-only">(coming soon)</span>
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}

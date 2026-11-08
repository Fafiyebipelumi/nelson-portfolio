import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { before } from "@/lib/content";
import { ActionButton } from "../action-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";
import { bubbleClip } from "../bubble-clip";

/* ============================================================================
   BEFORE — THE HOST
   ----------------------------------------------------------------------------
   Two speech bubbles facing each other, as in the Figma frame: the photo
   card's tail drops from its bottom-right corner (the photo runs on into it)
   and the cream card's tail drops from its bottom-left, so the two tails
   meet in the gutter between them.

   Each bubble is one element cut by a clip-path polygon. The corner radius,
   the tail and the soft inner curve where the tail leaves the card are all
   in fixed px (calc against 100%), so the shape holds at any card height
   instead of stretching with it.
   ========================================================================== */

/* Tail width and drop, in px: the bottom padding that makes room for it. */
const TAIL = 64;
const PHOTO_CLIP = bubbleClip("right", { tail: TAIL });
const CARD_CLIP = bubbleClip("left", { tail: TAIL });

export function BeforeHost() {
  const H = before.host;
  return (
    <section aria-label="The host" className="bg-umber text-cream">
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
      <div className="gutter pt-14 pb-12 sm:pt-16 lg:pt-[4.25rem] lg:pb-14">
        <div className="mx-auto grid max-w-[69.5rem] gap-5 md:grid-cols-2 md:gap-[1.1rem]">
          <Reveal y={28} className="h-full">
            {/* The square photo plus the tail's drop below it; the photo fills
                both, so it carries on into the tail. */}
            <div
              className="relative h-full overflow-hidden bg-[radial-gradient(120%_90%_at_50%_30%,#f3f1ec_0%,#e6e2d9_60%,#d6d0c3_100%)]"
              style={{ clipPath: PHOTO_CLIP, paddingBottom: TAIL }}
            >
              <div className="aspect-square" />
              <Image
                src={H.photo}
                alt="Nelson T. Ajulo"
                fill
                sizes="(min-width: 768px) 35rem, 92vw"
                className="origin-[50%_18%] scale-110 object-cover mix-blend-multiply"
                style={{ objectPosition: "50% 14%" }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div
              className="bg-cream text-umber flex h-full flex-col"
              style={{ clipPath: CARD_CLIP, paddingBottom: TAIL }}
            >
              <div className="flex flex-1 flex-col justify-center px-7 py-12 sm:px-12 lg:px-[3.4rem] lg:py-16">
                <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.75rem,4.8vw,4.4rem)] leading-[0.95] [scale:0.88_1]">
                  {H.headline}
                </h2>
                <div className="mt-6 max-w-[28rem] space-y-6 font-sans text-[0.9375rem] leading-[1.38] tracking-[-0.01em] lg:mt-8 lg:text-[1.0625rem] lg:space-y-7">
                  {H.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <ActionButton href={H.cta.href} variant="ink">
                    {H.cta.label}
                    <ArrowUpRight
                      className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </ActionButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <Stripes from="var(--color-umber)" to="var(--color-cream)" />
    </section>
  );
}

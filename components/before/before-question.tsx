import Image from "next/image";
import { before } from "@/lib/content";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   BEFORE — THE COMMUNITY QUESTION
   ----------------------------------------------------------------------------
   Fading lines in, then an illustration on the left and the explanation on
   the right: the 3D question mark from the design, with the small outlined
   marks drifting gently beside it.
   ========================================================================== */

export function BeforeQuestion() {
  const Q = before.question;
  return (
    <section aria-label="The community question" className="bg-umber text-cream">
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
      <div className="gutter grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-24">
        <Reveal y={28}>
          <QuestionArt />
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
            {Q.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-sand mt-6 font-sans text-base leading-[1.5] lg:text-[1.0625rem]">{Q.body}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* The Figma artwork in two layers: the large 3D question mark
   (question.svg, 663 x 378) and the small outlined ones (question-group.svg),
   placed where the design puts them so they can float on their own. */
function QuestionArt() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[663/378] w-full max-w-[41.5rem] select-none">
      <Image
        src="/question.svg"
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 41.5rem, 92vw"
        className="object-contain"
      />
      <Image
        src="/question-group.svg"
        alt=""
        width={178}
        height={188}
        unoptimized
        className="before-qgroup absolute h-auto"
        style={{ left: "4.68%", top: "29.1%", width: "26.85%" }}
      />
    </div>
  );
}

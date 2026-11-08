import type { Metadata } from "next";
import { aiAfrica } from "@/lib/content";
import { IntroHero } from "@/components/intro-hero";
import { CloseBand } from "@/components/close-band";
import { LIME_GLOW, WHAT_GLOW } from "@/components/glows";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { Stripes } from "@/components/stripes";

/* ============================================================================
   /ai-africa  —  AI, Africa and the bigger picture.
   ----------------------------------------------------------------------------
   The full version of the homepage's bigger-picture argument, promoted to its
   own page by the copy proposal (October 2026). Redesign system (November
   2026): the black hero with its edge glow; the argument on the warm dark
   band, its opening line in the heavy sans and the rest in sand; the four
   questions as colour cards on the grey offset shadow (the Writing themes'
   palette) over the amber and teal glows; and the cream close into speaking.
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo on AI in Africa, AI sovereignty and access: who can use AI, who owns the infrastructure, and who captures the value it creates.";

export const metadata: Metadata = {
  title: { absolute: "Nelson T. Ajulo on AI in Africa & AI Sovereignty" },
  description: DESCRIPTION,
  alternates: { canonical: "/ai-africa" },
  openGraph: {
    type: "article",
    title: "Nelson T. Ajulo on AI in Africa & AI Sovereignty",
    description: DESCRIPTION,
    url: "/ai-africa",
  },
};

/* The Writing themes' card colours, one per question. */
const TONES = ["#95ffa0", "#ffdd8f", "#d795ff", "#93b8ff"];

export default function AiAfricaPage() {
  const [opening, ...rest] = aiAfrica.body;
  return (
    <main id="main">
      <IntroHero glow={LIME_GLOW} pill={aiAfrica.eyebrow} title={aiAfrica.heading} lead={<p>{aiAfrica.lead}</p>} />

      {/* The argument */}
      <section aria-label="The argument" className="bg-umber text-cream">
        <div className="gutter grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <Reveal>
            <p className="font-sans text-[clamp(1.5rem,2.3vw,2.15rem)] leading-[1.12] font-semibold tracking-[-0.035em]">
              {opening}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="text-sand space-y-6 font-sans text-[1.0625rem] leading-[1.5] tracking-[-0.01em] lg:pt-2 lg:text-[1.1875rem]">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <Stripes from="var(--color-umber)" to="#000" />
      </section>

      {/* The questions */}
      <section
        aria-labelledby="questions-heading"
        data-tone="ink"
        className="on-ink text-cream relative isolate overflow-hidden bg-black"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: WHAT_GLOW }} />
        <div className="gutter-tight pt-14 pb-20 lg:pt-[5.5rem] lg:pb-[7.5rem] xl:px-[6.5rem]">
          <Reveal>
            <h2
              id="questions-heading"
              className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.6rem,4.6vw,4.4rem)] leading-none tracking-[-0.04em] [scale:0.88_1]"
            >
              {aiAfrica.questions.heading}
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
            {aiAfrica.questions.items.map((item, i) => (
              <StaggerItem key={item.title} className="h-full">
                <div
                  className="text-umber flex h-full flex-col rounded-[4px] px-6 py-7 shadow-[4px_4px_0_0_#6f6b63] lg:px-8 lg:py-9"
                  style={{ backgroundColor: TONES[i % TONES.length] }}
                >
                  <h3 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.02] tracking-[-0.02em] [scale:0.88_1] [-webkit-text-stroke:0.5px_currentColor]">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-sans text-base leading-[1.45] font-medium lg:text-[1.0625rem]">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CloseBand from="#000" heading={aiAfrica.practice.heading} body={aiAfrica.practice.body} cta={aiAfrica.cta} />
    </main>
  );
}

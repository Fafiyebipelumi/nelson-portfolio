import { before } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   BEFORE — HOW AN EPISODE WORKS
   ----------------------------------------------------------------------------
   Title and one line on the left; the six questions on the right as a
   vertical track. Each step has a hairline on its left that brightens and
   thickens on hover (the first is lit by default, as in the design).
   ========================================================================== */

export function BeforeFormat() {
  const F = before.format;
  return (
    <section aria-label="How an episode works" className="bg-umber text-cream">
      <div className="gutter grid gap-10 pt-10 pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-12 lg:pb-[7.5rem]">
        <Reveal>
          <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
            {F.headline}
          </h2>
          <p className="mt-4 max-w-[30rem] font-sans text-base font-medium lg:text-[1.0625rem]">{F.intro}</p>
        </Reveal>

        <Stagger className="group/steps space-y-5 lg:space-y-6">
          {F.steps.map((step, i) => (
            <StaggerItem key={step.name}>
              <div
                className={`border-l pl-3 transition-colors duration-300 hover:border-cream hover:[border-left-width:3px] ${
                  i === 0
                    ? "border-cream [border-left-width:3px] group-hover/steps:border-[#5e5a51] group-hover/steps:[border-left-width:1px] hover:!border-cream hover:![border-left-width:3px]"
                    : "border-[#5e5a51]"
                }`}
              >
                <h3 className="origin-left font-serif text-[1.45rem] leading-[1.1] [scale:0.88_1] [-webkit-text-stroke:0.4px_currentColor]">
                  {step.name}
                </h3>
                <p className="text-sand mt-1 font-sans text-[0.9375rem] leading-snug">{step.question}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import { duality } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { DrawRule, Reveal } from "./motion-primitives";

/* ============================================================================
   04 — TWO SIDES OF THE SAME IDEA
   ----------------------------------------------------------------------------
   The signature moment. Sections 03 showed two companies; this one argues
   they are one thesis.

   Structurally it is a diptych: two halves either side of a divider, resolving
   into a single centred statement. The only motion is the divider drawing
   itself in and a slow charge travelling down it — enough to imply the two
   halves are connected, not enough to ask for attention.
   ========================================================================== */

/**
 * Column placement lives on the `Reveal` wrapper (the actual grid child), so
 * this only owns alignment.
 */
function Half({
  title,
  venture,
  body,
  align,
}: {
  title: string;
  venture: string;
  body: string;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "lg:text-right" : undefined}>
      <p className="eyebrow text-signal-bright">{venture}</p>

      <h3 className="text-title text-bone mt-5 font-medium uppercase">
        {title}
      </h3>

      <p
        className={`text-ash text-lead mt-6 max-w-sm ${
          align === "right" ? "lg:ml-auto" : ""
        }`}
      >
        {body}
      </p>
    </div>
  );
}

export function Duality() {
  return (
    <Section tone="ink" grain>
      <SectionBody>
        {/* The section's meaning is the closing statement, not a headline, so
            the label carries the h2 and keeps the outline complete. */}
        <SectionLabel
          index="04"
          label={duality.eyebrow}
          tone="ink"
          asHeading
        />

        <div className="relative grid gap-14 sm:gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Divider — vertical on desktop, horizontal between the stacked
              halves on smaller screens. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
          >
            <DrawRule
              orientation="vertical"
              className="bg-rule-ink-strong absolute inset-0 w-px"
            />
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="animate-travel from-signal-bright/0 via-signal-bright to-signal-bright/0 h-24 w-px bg-gradient-to-b will-change-transform"
              />
            </div>
          </div>

          <Reveal className="lg:col-span-5">
            <Half
              title={duality.left.title}
              venture={duality.left.venture}
              body={duality.left.body}
              align="left"
            />
          </Reveal>

          {/* Mobile / tablet divider */}
          <DrawRule className="bg-rule-ink h-px w-full lg:hidden" />

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <Half
              title={duality.right.title}
              venture={duality.right.venture}
              body={duality.right.body}
              align="right"
            />
          </Reveal>
        </div>

        {/* Resolution */}
        <Reveal className="mt-24 sm:mt-32 lg:mt-44" y={30}>
          <div className="mx-auto max-w-5xl text-center">
            <DrawRule className="bg-signal-bright/40 mx-auto mb-12 h-px w-16 sm:mb-16" />
            <p className="text-display text-bone font-medium">
              {duality.statement.before}
              <span className="text-signal-bright font-serif italic">
                {duality.statement.emphasis}
              </span>
              {duality.statement.after}
            </p>
          </div>
        </Reveal>
      </SectionBody>
    </Section>
  );
}

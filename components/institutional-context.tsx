import { institutional } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   07 — INSTITUTIONAL CONTEXT
   ----------------------------------------------------------------------------
   Replaces the former "Featured in" logo strip [brief §1.1]. Rather than
   borrowed editorial logos, this panel states verifiable institutional
   standing: advocacy, an award, named backers, and prior recognitions. All
   copy is verbatim from brief §5.

   Set as a quiet reference grid on paper, not a headline moment: the content
   is credibility, so it should read as fact, plainly.
   ========================================================================== */

export function InstitutionalContext() {
  return (
    <Section tone="ink" grain>
      <SectionBody>
        <SectionLabel index="07" label={institutional.eyebrow} asHeading tone="ink" />

        <Stagger className="border-rule-strong grid border-t sm:grid-cols-2">
          {institutional.items.map((item, i) => (
            <StaggerItem
              key={item.label}
              className={`border-rule border-b py-8 sm:py-10 ${
                /* Left column gets a vertical rule and right padding; right
                   column gets left padding, so the two align to a centre gutter. */
                i % 2 === 0 ? "sm:border-rule sm:border-r sm:pr-12" : "sm:pl-12"
              }`}
            >
              <h3 className="eyebrow mb-4">{item.label}</h3>
              <p className="text-graphite max-w-md text-base leading-relaxed sm:text-[1.0625rem]">
                {item.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </SectionBody>
    </Section>
  );
}

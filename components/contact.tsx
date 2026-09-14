import { ArrowUpRight } from "lucide-react";
import { contact, profile } from "@/lib/content";
import { Section, SectionBody } from "./section";
import { DrawRule, Reveal, Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   10 — CLOSE
   ----------------------------------------------------------------------------
   One statement, four doors, nothing else. The four channels are set as full
   hairline rows rather than buttons so the ending stays in the same editorial
   language as the rest of the page.
   ========================================================================== */

export function Contact() {
  return (
    <Section id="contact" tone="ink" grain>
      <SectionBody>
        <Reveal>
          <h2 className="text-display text-bone max-w-4xl font-medium">
            {contact.statement.before}
            <span className="text-signal-bright font-serif italic">
              {contact.statement.emphasis}
            </span>
            {contact.statement.after}
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="text-ash mt-8 max-w-lg text-base leading-relaxed sm:text-lg">
            {contact.body}
          </p>
        </Reveal>

        {/* The opening rule sits outside the stagger: as a child it would take
            the first sequence slot and push every channel back a step. */}
        <DrawRule className="bg-rule-ink-strong mt-16 h-px w-full sm:mt-20 lg:mt-28" />

        <Stagger>
          {contact.channels.map((channel) => (
            <StaggerItem
              key={channel.label}
              className="border-rule-ink border-b"
            >
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-baseline justify-between gap-6 py-6 sm:py-7"
              >
                <span className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="text-bone group-hover:text-signal-bright text-2xl font-medium tracking-[-0.025em] transition-colors duration-300 sm:text-3xl">
                    {channel.label}
                  </span>
                  <span className="eyebrow text-slate">{channel.value}</span>
                </span>

                <ArrowUpRight
                  className="text-slate group-hover:text-signal-bright size-5 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="eyebrow text-slate mt-10">{profile.location}</p>
        </Reveal>
      </SectionBody>
    </Section>
  );
}

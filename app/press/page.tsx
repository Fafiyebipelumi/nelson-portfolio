import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { press } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody } from "@/components/section";
import { Reveal } from "@/components/motion-primitives";

/* ============================================================================
   /press  —  bios, headshots, boilerplates, coverage, media contact. Brief §8.
   ========================================================================== */

const DESCRIPTION =
  "Press and media resources for Nelson T. Ajulo: bios, headshots, company boilerplates, and media contact.";

export const metadata: Metadata = {
  title: "Press",
  description: DESCRIPTION,
  alternates: { canonical: "/press" },
  openGraph: { type: "website", title: "Press · Nelson T. Ajulo", description: DESCRIPTION, url: "/press" },
};

export default function PressPage() {
  return (
    <main id="main">
      <PageHeader eyebrow={press.eyebrow} title={press.heading} />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          {/* Bios */}
          <div className="space-y-14">
            {press.bios.map((bio) => (
              <Reveal key={bio.label}>
                <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
                  <h2 className="eyebrow text-signal-bright lg:col-span-3">{bio.label}</h2>
                  <p className="text-bone lg:col-span-9 max-w-3xl text-base leading-relaxed sm:text-lg">
                    {bio.body}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
                <h2 className="eyebrow text-signal-bright lg:col-span-3">{press.longBio.label}</h2>
                <p className="text-ash lg:col-span-9 text-base leading-relaxed">
                  {press.longBio.note}{" "}
                  <Link href={press.longBio.href} className="link-draw text-signal-bright">
                    Read the full profile
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          {/* Headshots */}
          <Reveal>
            <div className="border-rule-ink mt-20 grid gap-6 border-t pt-10 sm:mt-28 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <h2 className="eyebrow text-signal-bright">{press.headshots.heading}</h2>
              </div>
              <div className="lg:col-span-9">
                <p className="text-ash max-w-2xl text-base leading-relaxed">
                  {press.headshots.body}
                </p>
                <a
                  href={press.headshots.cta.href}
                  className="group border-rule-ink-strong hover:border-signal-bright text-bone mt-6 inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-medium transition-colors"
                >
                  <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  {press.headshots.cta.label}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Boilerplates */}
          <Reveal>
            <div className="border-rule-ink mt-16 grid gap-6 border-t pt-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <h2 className="eyebrow text-signal-bright">{press.boilerplates.heading}</h2>
              </div>
              <div className="lg:col-span-9 space-y-8">
                {press.boilerplates.items.map((b) => (
                  <div key={b.name}>
                    <h3 className="text-bone text-lg font-medium">{b.name}</h3>
                    <p className="text-ash mt-2 max-w-2xl text-base leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Coverage (intentionally empty until real links exist) */}
          <Reveal>
            <div className="border-rule-ink mt-16 grid gap-6 border-t pt-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <h2 className="eyebrow text-signal-bright">{press.coverage.heading}</h2>
              </div>
              <p className="text-slate lg:col-span-9 text-base leading-relaxed">
                {press.coverage.note}
              </p>
            </div>
          </Reveal>

          {/* Media enquiries */}
          <Reveal>
            <div className="border-rule-ink mt-16 grid gap-6 border-t pt-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <h2 className="eyebrow text-signal-bright">{press.mediaEnquiries.heading}</h2>
              </div>
              <div className="lg:col-span-9">
                <a
                  href={`mailto:${press.mediaEnquiries.email}`}
                  className="link-draw text-bone hover:text-signal-bright text-2xl font-medium tracking-[-0.02em] transition-colors"
                >
                  {press.mediaEnquiries.email}
                </a>
              </div>
            </div>
          </Reveal>
        </SectionBody>
      </Section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { writingPage, social } from "@/lib/content";
import { getPosts } from "@/lib/episodes";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody, SectionLabel } from "@/components/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

/* ============================================================================
   /writing  —  introduction, editorial categories, then the latest pieces.
   ----------------------------------------------------------------------------
   Copy from the October 2026 copy proposal. Posts come from Sanity; a
   graceful empty state with a LinkedIn pointer shows until the first pieces
   are published.
   ========================================================================== */

/* ISR: posts published in Sanity appear without a redeploy. */
export const revalidate = 60;

const DESCRIPTION =
  "Writing by Nelson T. Ajulo on artificial intelligence and AI safety, venture building and investment, African technology and economic opportunity, and lessons from building companies.";

export const metadata: Metadata = {
  title: { absolute: "Nelson T. Ajulo | AI, Venture Building & Technology" },
  description: DESCRIPTION,
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    title: "Nelson T. Ajulo | AI, Venture Building & Technology",
    description: DESCRIPTION,
    url: "/writing",
  },
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <main id="main">
      <PageHeader eyebrow={writingPage.eyebrow} title={writingPage.heading} lead={writingPage.lead}>
        <div className="mt-6 max-w-2xl space-y-5">
          {writingPage.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.15 + i * 0.04}>
              <p className="text-ash text-base leading-relaxed sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <Link
            href={writingPage.cta.href}
            className="link-draw group text-signal-bright hover:text-bone mt-10 inline-flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
          >
            {writingPage.cta.label}
            <ArrowUpRight
              className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </PageHeader>

      {/* Editorial categories */}
      <Section tone="ink" grain>
        <SectionBody className="!pt-0" rhythm="compact">
          <Reveal>
            <p className="eyebrow text-slate mb-5">{writingPage.categories.heading}</p>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2.5">
            {writingPage.categories.items.map((category) => (
              <StaggerItem
                key={category}
                className="border-rule-ink text-ash border px-4 py-2 text-sm"
              >
                {category}
              </StaggerItem>
            ))}
          </Stagger>
        </SectionBody>
      </Section>

      {/* Latest */}
      <Section id="latest" tone="ink" grain>
        <SectionBody>
          <SectionLabel index="01" label={writingPage.latestHeading} tone="ink" asHeading />

          {posts.length === 0 ? (
            <Reveal>
              <div className="border-rule-ink border-t pt-10">
                <p className="text-ash max-w-xl text-lg leading-relaxed">
                  {writingPage.empty}
                </p>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-signal-bright hover:text-bone group mt-8 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
                >
                  Follow on LinkedIn
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          ) : (
            <Stagger className="border-rule-ink-strong border-t">
              {posts.map((post) => {
                const external = Boolean(post.externalUrl);
                const href = post.externalUrl ?? `/writing/${post.slug}`;
                return (
                  <StaggerItem key={post.slug} className="border-rule-ink border-b">
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group grid gap-x-8 gap-y-3 py-8 lg:grid-cols-12 lg:items-baseline"
                    >
                      <p className="eyebrow text-signal-bright lg:col-span-2">{post.kicker ?? "Essay"}</p>
                      <h2 className="text-subtitle text-bone group-hover:text-signal-bright lg:col-span-7 font-medium transition-colors">
                        {post.title}
                      </h2>
                      <p className="eyebrow text-slate lg:col-span-3 lg:text-right">
                        {formatDate(post.publishedAt)}
                      </p>
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}
        </SectionBody>
      </Section>
    </main>
  );
}

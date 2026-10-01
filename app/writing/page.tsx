import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { writingPage, social } from "@/lib/content";
import { getPosts } from "@/lib/episodes";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody } from "@/components/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

/* ============================================================================
   /writing  —  long-form pieces. Launches as a list (brief §3). Reads posts
   from Sanity; shows a graceful empty state with a LinkedIn pointer until the
   first pieces are published.
   ========================================================================== */

/* ISR: posts published in Sanity appear without a redeploy. */
export const revalidate = 60;

const DESCRIPTION =
  "Long-form pieces and essays by Nelson T. Ajulo on artificial intelligence, safety, entrepreneurship, and the economics of access.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "/writing" },
  openGraph: { type: "website", title: "Writing · Nelson T. Ajulo", description: DESCRIPTION, url: "/writing" },
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
      <PageHeader eyebrow={writingPage.eyebrow} title={writingPage.heading} lead={writingPage.lead} />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
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

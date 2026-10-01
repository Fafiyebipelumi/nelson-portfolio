import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/lib/episodes";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionBody } from "@/components/section";
import { PageHeader } from "@/components/page-header";

/* ============================================================================
   /writing/[slug]  —  essay page
   ----------------------------------------------------------------------------
   Generated from the `post` documents in Sanity. Slugs come from Sanity at
   build time via generateStaticParams; with no project configured yet the
   list is empty and any direct hit 404s cleanly.

   Posts with an externalUrl live somewhere else (LinkedIn, a publication) and
   the /writing list links out directly. If a reader lands on the canonical
   /writing/[slug] URL for such a post — for instance, from a stale link — we
   redirect them to the source rather than render a stub locally.

   Body copy is Portable Text; the renderer is themed for the ink surface so
   it matches the rest of the site.
   ========================================================================== */

/* ISR: new posts and edits in Sanity appear without a redeploy. Slugs not
   prerendered at build still render on demand (dynamicParams defaults to true). */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/writing/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return { title: "Essay not found" };

  return {
    title: `${post.title} · Writing`,
    description: post.excerpt,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/* ---- Portable Text renderer, tuned for the ink editorial surface ---------- */

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-ash mt-6 text-base leading-relaxed sm:text-lg">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-title text-bone mt-16 mb-6 font-medium sm:mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-subtitle text-bone mt-12 mb-4 font-medium">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-signal-bright/50 text-bone my-10 border-l pl-6 font-serif text-xl leading-relaxed sm:pl-10 sm:text-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-ash marker:text-signal-bright mt-6 list-disc space-y-2 pl-6 text-base leading-relaxed sm:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-ash marker:text-signal-bright mt-6 list-decimal space-y-2 pl-6 text-base leading-relaxed sm:text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-bone font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-serif italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-ink-raised border-rule-ink text-bone rounded border px-1.5 py-0.5 font-mono text-[0.875em]">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = (value?.href as string | undefined) ?? "#";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="link-draw text-signal-bright hover:text-bone transition-colors"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function WritingPost(
  props: PageProps<"/writing/[slug]">,
) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  /* Post lives elsewhere — send the reader to the source. */
  if (post.externalUrl) redirect(post.externalUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Nelson T. Ajulo" },
    url: `https://tnajulo.com/writing/${post.slug}`,
  };

  const hasBody = Array.isArray(post.body) && post.body.length > 0;

  return (
    <main id="main">
      <JsonLd data={jsonLd} />

      <PageHeader
        eyebrow={post.kicker ?? "Essay"}
        title={post.title}
        lead={post.excerpt}
      />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow text-slate mb-10 sm:mb-12">
                {formatDate(post.publishedAt)}
              </p>

              {hasBody ? (
                <article className="max-w-2xl">
                  <PortableText
                    value={post.body as never}
                    components={portableTextComponents}
                  />
                </article>
              ) : (
                <p className="text-ash max-w-2xl text-base leading-relaxed sm:text-lg">
                  Full text is not published yet. Follow the site or the
                  newsletter for the release.
                </p>
              )}

              <div className="border-rule-ink mt-20 border-t pt-8 sm:mt-28">
                <Link
                  href="/writing"
                  className="link-draw text-signal-bright hover:text-bone group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
                >
                  <ArrowLeft
                    className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  Back to writing
                </Link>
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </main>
  );
}

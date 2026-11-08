import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/lib/episodes";
import { writingPage } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { IntroHero } from "@/components/intro-hero";
import { LIME_GLOW } from "@/components/glows";
import { ActionButton } from "@/components/action-button";
import { Stripes } from "@/components/stripes";

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

   Redesign system (November 2026): the Writing hero's black and glow with
   the title, then the essay set on cream for reading, serif headings and
   pull quotes, and the Writing page's two actions to close.
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
    title: { absolute: `${post.title} | Nelson T. Ajulo` },
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

/* ---- Portable Text renderer, set for the cream reading band ------------- */

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 font-sans text-[1.0625rem] leading-[1.65] tracking-[-0.01em] text-[#3d3a33] sm:text-[1.1875rem]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-16 mb-2 w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.1rem,3.4vw,3rem)] leading-[1.02] [scale:0.88_1] sm:mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-12 mb-1 font-sans text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.03em]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-umber my-12 border-l-[3px] pl-6 font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.15] sm:pl-9">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="marker:text-umber mt-6 list-disc space-y-2 pl-6 font-sans text-[1.0625rem] leading-[1.6] text-[#3d3a33] sm:text-[1.1875rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="marker:text-umber mt-6 list-decimal space-y-2 pl-6 font-sans text-[1.0625rem] leading-[1.6] text-[#3d3a33] sm:text-[1.1875rem]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-umber font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-[4px] bg-[#efe6c8] px-1.5 py-0.5 font-mono text-[0.875em]">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = (value?.href as string | undefined) ?? "#";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="text-umber decoration-umber/40 hover:decoration-umber underline underline-offset-4 transition-colors"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

  const date = formatDate(post.publishedAt);
  const arrow = (
    <ArrowUpRight
      className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );

  return (
    <main id="main">
      <JsonLd data={jsonLd} />

      <IntroHero
        glow={LIME_GLOW}
        back={{ label: "Writing", href: "/writing" }}
        pill={post.kicker ?? "Essay"}
        title={post.title}
        lead={
          <>
            {post.excerpt ? <p>{post.excerpt}</p> : null}
            {date ? (
              <p className="text-stone mt-5 text-[0.9375rem] font-medium">
                Nelson T. Ajulo · {date}
              </p>
            ) : null}
          </>
        }
        align="center"
        into="cream"
      />

      <section aria-label="Essay" className="bg-cream text-umber">
        <div className="gutter-tight pt-10 pb-20 sm:pt-14 lg:pt-16 lg:pb-28">
          <article className="mx-auto max-w-[44rem]">
            {hasBody ? (
              <PortableText value={post.body as never} components={portableTextComponents} />
            ) : (
              <p className="font-sans text-[1.0625rem] leading-[1.65] text-[#3d3a33] sm:text-[1.1875rem]">
                The full text is not published yet. Subscribe to the newsletter for the release.
              </p>
            )}

            <div className="mt-16 flex flex-wrap gap-4 border-t border-[#d8cfb4] pt-10 sm:mt-20">
              <ActionButton href="/writing" variant="ink">
                More writing
                {arrow}
              </ActionButton>
              <ActionButton href={writingPage.ctas.subscribe.href} variant="paper">
                {writingPage.ctas.subscribe.label}
                {arrow}
              </ActionButton>
            </div>
          </article>
        </div>
        <Stripes from="var(--color-cream)" to="var(--color-umber)" />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { getPosts } from "@/lib/episodes";
import { WritingHero } from "@/components/writing/writing-hero";
import { WritingThemes } from "@/components/writing/writing-themes";

/* ============================================================================
   /writing  —  NOTES FROM BEFORE  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   The title and premise with the essay pills, then the themes and the two
   actions. Essays come from Sanity: a pill links to the published essay of
   the same title, and "Read the latest" opens the newest one (LinkedIn until
   the first is out). Header and footer come from the root layout.
   ========================================================================== */

/* ISR: essays published in Sanity appear without a redeploy. */
export const revalidate = 60;

const TITLE = "Notes from BEFORE | Writing by Nelson T. Ajulo";
const DESCRIPTION =
  "Essays on safety, participation and ownership, and the written piece that accompanies every BEFORE episode: the moment the conversation turned, and the question it leaves for the community.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/writing",
  },
};

export default async function WritingPage() {
  /* Empty until the first real essay is published (test posts are filtered
     out in lib/episodes.ts); the page then fills in on its own. */
  const posts = await getPosts();
  const hrefOf = (post: (typeof posts)[number]) =>
    post.externalUrl ?? `/writing/${post.slug}`;

  const essays = posts.map((post) => ({
    title: post.title,
    href: hrefOf(post),
  }));
  /* No essay yet: "Read the latest" renders inert (empty href). */
  const latestHref = posts[0] ? hrefOf(posts[0]) : "";

  return (
    <main id="main">
      <WritingHero essays={essays} />
      <WritingThemes latestHref={latestHref} />
    </main>
  );
}

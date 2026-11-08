import type { Metadata } from "next";
import { social, writingPage } from "@/lib/content";
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

/* Titles compared loosely: case, quotes and punctuation don't matter. */
const normalise = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export default async function WritingPage() {
  const posts = await getPosts();
  const hrefOf = (post: (typeof posts)[number]) =>
    post.externalUrl ?? `/writing/${post.slug}`;

  const byTitle = new Map(
    posts.map((post) => [normalise(post.title), hrefOf(post)]),
  );
  const pillHrefs = writingPage.featured.map(
    (pill) => byTitle.get(normalise(pill.title)) ?? null,
  );
  const latestHref = posts[0] ? hrefOf(posts[0]) : social.linkedin;

  return (
    <main id="main">
      <WritingHero hrefs={pillHrefs} />
      <WritingThemes latestHref={latestHref} />
    </main>
  );
}

import { getPost } from "@/lib/episodes";
import { renderOg, size, contentType } from "@/lib/og-image";

/* Per-essay share image: kicker, title, byline. Generated per post via
   next/og. */

export { size, contentType };
export const alt = "An essay by Nelson T. Ajulo";

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  return renderOg({
    eyebrow: post?.kicker ?? "Essay",
    title: post?.title ?? "Writing",
  });
}

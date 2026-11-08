import { getEpisode } from "@/lib/episodes";
import { renderOg, size, contentType } from "@/lib/og-image";

/* Per-episode share image (brief §4.3), on the BEFORE ground: episode
   number, title, guest. Generated per episode via next/og. */

export { size, contentType };
export const alt = "An episode of BEFORE, hosted by Nelson T. Ajulo";

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const episode = await getEpisode(slug);

  return renderOg({
    eyebrow: episode
      ? `BEFORE · Episode ${String(episode.number).padStart(2, "0")}`
      : "BEFORE",
    title: episode?.title ?? "BEFORE",
    byline: episode?.guestName
      ? `With ${episode.guestName}${episode.guestRole ? `, ${episode.guestRole}` : ""}`
      : "Hosted by Nelson T. Ajulo",
    tone: "before",
  });
}

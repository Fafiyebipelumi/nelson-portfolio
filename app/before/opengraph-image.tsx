import { before } from "@/lib/content";
import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "BEFORE | A podcast by Nelson T. Ajulo";

export default function Image() {
  return renderOg({
    eyebrow: `BEFORE · ${before.hero.eyebrow}`,
    title: before.hero.headline,
    byline: "Hosted by Nelson T. Ajulo · Season one begins January 2027",
    tone: "before",
  });
}

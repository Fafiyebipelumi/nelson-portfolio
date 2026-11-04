import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "What Comes Next | AI & Technology Podcast";

export default function Image() {
  return renderOg({
    eyebrow: "The podcast",
    title: "What Comes Next.",
    tone: "podcast",
  });
}

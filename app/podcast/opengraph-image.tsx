import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "What Comes Next, a podcast by Nelson T. Ajulo";

export default function Image() {
  return renderOg({
    eyebrow: "The podcast",
    title: "What Comes Next.",
    tone: "podcast",
  });
}

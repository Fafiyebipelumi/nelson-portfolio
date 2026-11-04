import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo | AI, Venture Building & Technology";

export default function Image() {
  return renderOg({
    eyebrow: "Writing",
    title: "Notes from the work of building.",
  });
}

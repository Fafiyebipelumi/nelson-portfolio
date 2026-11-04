import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo | AI & Technology Speaker";

export default function Image() {
  return renderOg({
    eyebrow: "Speaking",
    title: "The important questions about AI begin where the product demo ends.",
  });
}

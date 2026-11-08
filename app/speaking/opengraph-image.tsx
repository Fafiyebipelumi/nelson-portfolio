import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo | Speaker on safety, AI and ownership";

export default function Image() {
  return renderOg({
    eyebrow: "Speaking",
    title: "The important questions about safety and AI begin where the product demo ends.",
  });
}

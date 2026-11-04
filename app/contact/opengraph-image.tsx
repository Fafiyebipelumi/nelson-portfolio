import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Contact Nelson T. Ajulo | Business & Speaking";

export default function Image() {
  return renderOg({
    eyebrow: "Contact",
    title: "Let's talk about what you're building.",
  });
}

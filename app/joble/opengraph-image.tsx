import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Joble";

export default function Image() {
  return renderOg({
    eyebrow: "Joble",
    title: "Never miss the customer you already earned.",
  });
}

import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "15Wins Ventures";

export default function Image() {
  return renderOg({
    eyebrow: "15Wins Ventures",
    title: "Capital and studio infrastructure for the next decade.",
  });
}

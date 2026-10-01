import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo, Entrepreneur, Investor, Technologist";

export default function Image() {
  return renderOg({
    eyebrow: "Nelson T. Ajulo",
    title: "Building technology that acts when people cannot.",
  });
}

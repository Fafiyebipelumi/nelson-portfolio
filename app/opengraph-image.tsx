import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo | Technology Entrepreneur & Investor";

export default function Image() {
  return renderOg({
    eyebrow: "Nelson T. Ajulo",
    title: "I build technology companies and invest in ideas that should reach more people.",
  });
}

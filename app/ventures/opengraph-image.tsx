import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo | AI Ventures & Early-Stage Investment";

export default function Image() {
  return renderOg({
    eyebrow: "Ventures",
    title: "I build and back companies working on problems worth solving.",
  });
}

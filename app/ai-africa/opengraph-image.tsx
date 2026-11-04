import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Nelson T. Ajulo on AI in Africa & AI Sovereignty";

export default function Image() {
  return renderOg({
    eyebrow: "AI, Africa and the bigger picture",
    title: "AI's future will be shaped by more than the people building the models.",
  });
}

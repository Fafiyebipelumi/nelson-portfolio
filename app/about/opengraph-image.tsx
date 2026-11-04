import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "About Nelson T. Ajulo";

export default function Image() {
  return renderOg({
    eyebrow: "About",
    title: "I'm interested in what happens when technology meets a real problem.",
  });
}

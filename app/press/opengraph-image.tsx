import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Press | Nelson T. Ajulo";

export default function Image() {
  return renderOg({
    eyebrow: "Press",
    title: "Everything a producer or journalist needs, ready to copy.",
  });
}

import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Press · Nelson T. Ajulo";

export default function Image() {
  return renderOg({ eyebrow: "Press", title: "Press and media." });
}

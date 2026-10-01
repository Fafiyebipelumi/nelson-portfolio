import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "About Nelson T. Ajulo";

export default function Image() {
  return renderOg({ eyebrow: "About", title: "About Nelson." });
}

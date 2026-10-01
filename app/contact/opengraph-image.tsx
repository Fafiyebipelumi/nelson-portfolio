import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Contact · Nelson T. Ajulo";

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Get in touch." });
}

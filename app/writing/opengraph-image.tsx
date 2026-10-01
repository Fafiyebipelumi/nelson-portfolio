import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Writing · Nelson T. Ajulo";

export default function Image() {
  return renderOg({ eyebrow: "Writing", title: "Writing." });
}

import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Speaking · Nelson T. Ajulo";

export default function Image() {
  return renderOg({ eyebrow: "Speaking", title: "Rooms where this gets decided." });
}

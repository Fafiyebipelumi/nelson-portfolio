import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "Notes from BEFORE | Writing by Nelson T. Ajulo";

export default function Image() {
  return renderOg({
    eyebrow: "Writing",
    title: "Notes from BEFORE",
  });
}

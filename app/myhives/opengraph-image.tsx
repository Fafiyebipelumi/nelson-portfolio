import { renderOg, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const alt = "MyHives";

export default function Image() {
  return renderOg({
    eyebrow: "MyHives",
    title: "Technology that protects before the emergency.",
  });
}

import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

/** Returns a Sanity image URL, or null when Sanity is not configured. */
export function urlForImage(source: SanityImageSource | undefined): string | null {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").url();
}

import { StudioClient } from "./studio-client";

/* ============================================================================
   /studio  —  embedded Sanity Studio
   ----------------------------------------------------------------------------
   Nelson manages episodes and writing here. The Studio itself lives in a
   client component (studio-client) so it never enters the server graph; this
   page only carries the route metadata and renders it. Requires the Sanity
   env vars; excluded from indexing in the SEO task.
   ========================================================================== */

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioClient />;
}

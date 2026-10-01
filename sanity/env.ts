/* ============================================================================
   SANITY ENV
   ----------------------------------------------------------------------------
   Project credentials are Nelson-owned and read from the environment. Until
   they are set, `sanityConfigured` is false and the data layer falls back to
   local content, so the site builds and renders with no Sanity project.

   Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (and, for
   the embedded Studio, nothing more) to go live.
   ========================================================================== */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a real project id is present. Gates every Sanity call. */
export const sanityConfigured = projectId.length > 0;

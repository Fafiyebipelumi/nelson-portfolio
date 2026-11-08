/* ============================================================================
   EDGE GLOWS
   ----------------------------------------------------------------------------
   The soft colour at the edges of the dark venture-page sections (Figma,
   November 2026), as CSS backgrounds so they cost no image download.
   ========================================================================== */

/** Hero: blue-violet down the top-left edge, a faint amber bottom-right. */
export const HERO_GLOW = [
  "radial-gradient(26% 62% at 0% 8%, rgb(122 118 236 / 0.75) 0%, rgb(70 92 190 / 0.35) 45%, transparent 100%)",
  "radial-gradient(12% 40% at 0% 45%, rgb(64 120 140 / 0.35) 0%, transparent 100%)",
  "radial-gradient(18% 34% at 100% 100%, rgb(214 168 52 / 0.55) 0%, rgb(140 120 40 / 0.2) 50%, transparent 100%)",
].join(", ");

/** "What it is": amber at the top-left, teal at the right. */
export const WHAT_GLOW = [
  "radial-gradient(24% 48% at 0% 6%, rgb(200 98 32 / 0.72) 0%, rgb(140 70 30 / 0.3) 45%, transparent 100%)",
  "radial-gradient(22% 46% at 100% 92%, rgb(150 214 240 / 0.7) 0%, rgb(84 196 186 / 0.35) 45%, transparent 100%)",
  "radial-gradient(12% 30% at 100% 40%, rgb(70 170 150 / 0.35) 0%, transparent 100%)",
].join(", ");

/** Writing and Contact heroes: blue-violet down the left edge, a broad
    yellow-green glow at the right, warming to yellow in the corner. */
export const LIME_GLOW = [
  "radial-gradient(22% 60% at 0% 10%, rgb(110 112 228 / 0.8) 0%, rgb(60 86 170 / 0.35) 45%, transparent 100%)",
  "radial-gradient(12% 40% at 0% 50%, rgb(58 110 140 / 0.35) 0%, transparent 100%)",
  "radial-gradient(26% 62% at 100% 72%, rgb(196 206 52 / 0.75) 0%, rgb(120 140 40 / 0.3) 50%, transparent 100%)",
  "radial-gradient(22% 32% at 100% 100%, rgb(248 214 58 / 0.9) 0%, rgb(220 160 40 / 0.35) 50%, transparent 100%)",
].join(", ");

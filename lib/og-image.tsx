import { ImageResponse } from "next/og";

/* ============================================================================
   OG IMAGE RENDERER
   ----------------------------------------------------------------------------
   Shared generator so every route can ship a unique share image (brief §11:
   no reused OG image) without duplicating layout. Each route's
   opengraph-image.tsx re-exports `size`/`contentType` and calls `renderOg`.

   Two tones: `site` (green-black + emerald/teal) and `podcast` (green-black + aqua).
   ========================================================================== */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = { site: "#3fd0b8", podcast: "#57cbb8" } as const;

export function renderOg({
  eyebrow,
  title,
  tone = "site",
}: {
  eyebrow: string;
  title: string;
  tone?: "site" | "podcast";
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060c09",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: ACCENT[tone] }}>{eyebrow}</span>
          <span style={{ color: "#7e8c85" }}>tnajulo.com</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.03,
            color: "#ffffff",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", color: "#aebab4", fontSize: 28 }}>
          Nelson T. Ajulo
        </div>
      </div>
    ),
    size,
  );
}

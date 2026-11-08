import { ImageResponse } from "next/og";

/* ============================================================================
   OG IMAGE RENDERER  (redesign system, November 2026)
   ----------------------------------------------------------------------------
   Shared generator so every route can ship a unique share image (brief §11:
   no reused OG image) without duplicating layout. Each route's
   opengraph-image.tsx re-exports `size`/`contentType` and calls `renderOg`.

   Two grounds, both from the redesign: `site` is black with the blue-violet
   and amber edge glows of the inner-page heroes; `before` is the BEFORE
   hero's dark green turning violet, with the amber sun in the corner.
   Type is cream, secondary lines warm grey, the eyebrow a grey pill.
   ========================================================================== */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#fff8e1";
const STONE = "#a8a294";

const GROUND = {
  site: [
    "radial-gradient(circle at 0% 0%, rgba(122,118,236,0.8) 0%, rgba(70,92,190,0.3) 22%, rgba(0,0,0,0) 42%)",
    "radial-gradient(circle at 100% 100%, rgba(214,168,52,0.7) 0%, rgba(140,120,40,0.25) 18%, rgba(0,0,0,0) 34%)",
    "linear-gradient(#000000, #000000)",
  ].join(", "),
  before: [
    "radial-gradient(circle at 100% 100%, #9d45ff 0%, #7b37d6 25%, rgba(123,55,214,0) 55%)",
    "linear-gradient(100deg, #1b2220 0%, #1d2321 42%, #3a2861 64%, #7a3ad8 86%, #9343f6 100%)",
  ].join(", "),
} as const;

export function renderOg({
  eyebrow,
  title,
  byline = "Nelson T. Ajulo",
  tone = "site",
}: {
  eyebrow: string;
  title: string;
  byline?: string;
  tone?: "site" | "before";
}) {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage: GROUND[tone],
          padding: "72px",
          fontFamily: "sans-serif",
          color: CREAM,
        }}
      >
        {tone === "before" ? (
          <div
            style={{
              position: "absolute",
              top: -130,
              right: -110,
              width: 300,
              height: 300,
              borderRadius: 9999,
              border: "4px solid #f3d38a",
              backgroundImage:
                "radial-gradient(circle at 30% 70%, #f2a514 0%, #d58b0b 55%, #b8780c 100%)",
            }}
          />
        ) : null}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              display: "flex",
              backgroundColor: "#3a3833",
              borderRadius: 9999,
              padding: "10px 22px",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </span>
          {tone === "site" ? (
            <span style={{ color: STONE, fontSize: 24 }}>tnajulo.com</span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 66 : 78,
            lineHeight: 1.04,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            maxWidth: 1010,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", color: STONE, fontSize: 28, fontWeight: 600 }}>
          {byline}
        </div>
      </div>
    ),
    size,
  );
}

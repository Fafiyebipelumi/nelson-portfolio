import { ImageResponse } from "next/og";
import { getEpisode } from "@/lib/episodes";

/* ============================================================================
   Per-episode social share image (brief §4.3).
   Cover-art palette (dark + aqua), episode number, title, guest. Generated at
   build time per episode via next/og.
   ========================================================================== */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "What Comes Next episode";

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const episode = await getEpisode(slug);

  const number = episode ? `EPISODE ${episode.number}` : "WHAT COMES NEXT";
  const title = episode?.title ?? "What Comes Next";
  const guest = episode?.guestName
    ? `With ${episode.guestName}${episode.guestRole ? `, ${episode.guestRole}` : ""}`
    : "A podcast by Nelson T. Ajulo";

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
            color: "#57cbb8",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>{number}</span>
          <span style={{ color: "#7e8c85" }}>What Comes Next</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.05,
            color: "#ffffff",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", color: "#aebab4", fontSize: 30 }}>
          {guest}
        </div>
      </div>
    ),
    size,
  );
}

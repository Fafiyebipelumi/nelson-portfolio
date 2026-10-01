import { ImageResponse } from "next/og";
import { getPost } from "@/lib/episodes";

/* ============================================================================
   Per-essay social share image (brief §4.3 parallel for writing).
   Site palette (dark green-black + emerald/teal), kicker, title, byline.
   Generated at build time per post via next/og.
   ========================================================================== */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "An essay by Nelson T. Ajulo";

export default async function Image(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  const kicker = (post?.kicker ?? "ESSAY").toUpperCase();
  const title = post?.title ?? "Writing";

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
          <span style={{ color: "#3fd0b8" }}>{kicker}</span>
          <span style={{ color: "#7e8c85" }}>tnajulo.com</span>
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
          Nelson T. Ajulo
        </div>
      </div>
    ),
    size,
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Required to let next/image process the local Washington Post SVG. Safe
       here because every image source is a first-party asset in /public — the
       CSP + attachment disposition below sandbox it regardless. */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Guest photos and episode cover art are served by Sanity's image CDN, so
       next/image must be allowed to optimise from that host. */
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;

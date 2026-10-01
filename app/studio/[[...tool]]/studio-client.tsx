"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { sanityConfigured } from "../../../sanity/env";

/* Client boundary for the Studio. Importing sanity.config here (rather than in
   the server page) keeps the Sanity Studio out of the React Server Component
   graph, where some of its dependencies resolve to `react-server` builds that
   have no default export and break the build.

   Until a project id exists, NextStudio would throw ("Configuration must
   contain projectId"), so we show a short setup note instead. */
export function StudioClient() {
  if (!sanityConfigured) {
    return (
      <main
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#a2a2a9",
          fontFamily: "ui-monospace, monospace",
          fontSize: "13px",
          letterSpacing: "0.04em",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ maxWidth: "28rem", lineHeight: 1.7 }}>
          Studio not connected yet. Set NEXT_PUBLIC_SANITY_PROJECT_ID (and the
          dataset) in the environment, then reload this page to manage episodes
          and writing.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

/* ============================================================================
   SANITY STUDIO CONFIG
   ----------------------------------------------------------------------------
   Powers the embedded Studio at /studio, where Nelson manages episodes and
   writing. Also used by the Sanity CLI. Project id and dataset come from the
   environment; both must be set for the Studio to connect.
   ========================================================================== */

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});

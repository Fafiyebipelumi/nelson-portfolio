import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId, sanityConfigured } from "../env";

/* The client is null until a project id exists. Callers must guard on it (the
   data layer in lib/ does), so an unconfigured project never throws. */
export const client: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // published, cached reads; fine for a content site
    })
  : null;

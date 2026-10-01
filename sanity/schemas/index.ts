import type { SchemaTypeDefinition } from "sanity";
import { episode } from "./episode";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [episode, post],
};

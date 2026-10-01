import { defineField, defineType } from "sanity";

/* ============================================================================
   POST (Writing)
   ----------------------------------------------------------------------------
   Long-form pieces and essays for /writing. Kept deliberately simple so the
   writing section can launch as a list (brief §3) and grow into full articles.
   ========================================================================== */

export const post = defineType({
  name: "post",
  title: "Writing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
      description: "Short category label, for example Essay or Note.",
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "If the piece lives elsewhere (LinkedIn, a publication), link out.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

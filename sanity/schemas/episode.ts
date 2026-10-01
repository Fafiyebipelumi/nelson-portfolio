import { defineField, defineType } from "sanity";

/* ============================================================================
   EPISODE
   ----------------------------------------------------------------------------
   The full episode data model from brief §4.3. Everything the site needs to
   render an episode page, the latest-episode feature, the archive, the RSS
   feed and the per-episode share image comes from here. No episode data is
   hard-coded in the app.
   ========================================================================== */

export const episode = defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Episode number",
      type: "number",
      description:
        "Assigned automatically as the next number when you create an episode. You can still edit it to correct a clash; it warns if the number is already taken.",
      /* Auto-increment: default to one past the highest existing episode
         number, so the number is generated rather than typed by hand. */
      initialValue: async (_params, context) => {
        const client = context.getClient({ apiVersion: "2024-10-01" });
        const highest: number | null = await client.fetch(
          `*[_type == "episode" && defined(number)] | order(number desc)[0].number`,
        );
        return (highest ?? 0) + 1;
      },
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom(async (value, context) => {
            if (typeof value !== "number") return true;
            const client = context.getClient({ apiVersion: "2024-10-01" });
            const id = (context.document?._id ?? "").replace(/^drafts\./, "");
            /* Exclude this document (draft and published ids) from the check. */
            const taken: boolean = await client.fetch(
              `count(*[_type == "episode" && number == $value && !(_id in [$id, "drafts." + $id])]) > 0`,
              { value, id },
            );
            return taken ? "Another episode already uses this number." : true;
          }),
    }),
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
      name: "guestName",
      title: "Guest name",
      type: "string",
    }),
    defineField({
      name: "guestRole",
      title: "Guest role and organisation",
      type: "string",
    }),
    defineField({
      name: "guestPhoto",
      title: "Guest photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      description:
        "Leave empty (or set in the future) for a planned lineup card. Once set to a past/present date, the episode moves from the season lineup into the latest/archive.",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "For example 48 min",
    }),
    defineField({
      name: "coverArt",
      title: "Cover art override",
      type: "image",
      description: "Optional. Falls back to the show cover art.",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      description: "One line, used on cards and the latest-episode feature.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      type: "array",
      of: [{ type: "block" }],
      description: "Full synopsis / show notes.",
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
    }),
    defineField({
      name: "appleUrl",
      title: "Apple Podcasts URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "embedUrl",
      title: "Embed player URL",
      type: "url",
      description: "The platform embed iframe src used inline on the page.",
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        "Optional tags powering the archive topic filters, for example AI, Safety, Access.",
    }),
    defineField({
      name: "sponsors",
      title: "Sponsor mentions",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", number: "number", media: "coverArt" },
    prepare({ title, number, media }) {
      return { title, subtitle: number ? `Episode ${number}` : undefined, media };
    },
  },
});

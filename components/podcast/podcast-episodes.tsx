import Image from "next/image";
import { podcast } from "@/lib/content";
import { getUpcomingEpisodes, type Episode } from "@/lib/episodes";
import { urlForImage } from "@/sanity/lib/image";
import { Section, SectionBody, SectionLabel } from "../section";
import { Stagger, StaggerItem, Reveal } from "../motion-primitives";

/* ============================================================================
   D — SEASON ONE: THE OPENING ARC
   ----------------------------------------------------------------------------
   The slate of episodes still TO COME, so listeners can anticipate them. An
   episode belongs here while its Publication date (publishedAt) is empty or in
   the future; the moment Nelson sets a past/present date he "releases" it, and
   the same document leaves this list and becomes the Latest episode (then the
   Archive). Sourced from Sanity via getUpcomingEpisodes(), ordered by number.

   Card anatomy: index top-left, timing top-right (the expected date, or
   "Coming soon" until one is set), then title and blurb, and the guest in a
   footer pinned to the bottom with their photo when one exists. Keeping timing
   and guest in separate slots means a scheduled date no longer hides the guest.

   Before any real episodes exist, the section falls back to the illustrative
   lineup in lib/content.ts so the page still reads. Either way the heading
   count ("N conversations.") matches the number of cards actually shown.
   ========================================================================== */

interface LineupCard {
  key: string;
  index: string;
  title: string;
  guest: string;
  guestRole: string | null;
  photo: string | null;
  blurb: string;
  /** Formatted future date when the episode is scheduled, else null. */
  when: string | null;
}

const COUNT_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

function countWord(n: number): string {
  return COUNT_WORDS[n] ?? String(n);
}

function formatMonth(iso?: string): string | null {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

function toCard(ep: Episode): LineupCard {
  const future = ep.publishedAt && new Date(ep.publishedAt) > new Date();
  return {
    key: ep.slug,
    index: String(ep.number).padStart(2, "0"),
    title: ep.title,
    guest: ep.guestName ? ep.guestName : "Guest to be announced",
    guestRole: ep.guestRole ?? null,
    photo: urlForImage(ep.guestPhoto),
    blurb: ep.shortDescription,
    when: future ? formatMonth(ep.publishedAt) : null,
  };
}

export async function PodcastEpisodes() {
  const upcoming = await getUpcomingEpisodes();
  const usingReal = upcoming.length > 0;

  const cards: LineupCard[] = usingReal
    ? upcoming.map(toCard)
    : podcast.episodes.items.map((ep) => ({
        key: ep.index,
        index: ep.index,
        title: ep.title,
        guest: ep.guest,
        guestRole: null,
        photo: null,
        blurb: ep.blurb,
        when: null,
      }));

  const count = cards.length;
  const sub = `${countWord(count)} ${count === 1 ? "conversation" : "conversations"}. ${podcast.episodes.subTail}`;
  const note = usingReal ? "Episodes to come." : podcast.episodes.note;

  return (
    <Section id="lineup" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="03" label={podcast.episodes.eyebrow} tone="podcast" />

        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 className="text-title text-bone font-medium">
              {podcast.episodes.headline}
            </h2>
            <p className="text-ash mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              {sub}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-3 lg:col-start-10" delay={0.06}>
            <p className="eyebrow text-slate lg:text-right">{note}</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-px sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((ep) => (
            <StaggerItem
              key={ep.key}
              className="bg-ink-raised border-rule-ink flex flex-col border p-7 sm:p-8"
            >
              {/* Index + timing (the date stays here; the guest no longer does) */}
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-airwave">{ep.index}</span>
                <span className="eyebrow text-slate text-right">
                  {ep.when ? `Expected ${ep.when}` : "Coming soon"}
                </span>
              </div>

              <h3 className="text-bone mt-6 text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                {ep.title}
              </h3>
              <p className="text-ash mt-4 text-sm leading-relaxed">{ep.blurb}</p>

              {/* Guest, pinned to the bottom so cards align; photo when present. */}
              <div className="border-rule-ink mt-auto flex items-center gap-3 border-t pt-6">
                {ep.photo ? (
                  <span className="border-rule-ink relative size-9 shrink-0 overflow-hidden rounded-full border">
                    <Image
                      src={ep.photo}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover grayscale"
                    />
                  </span>
                ) : null}
                <span className="min-w-0">
                  <span className="text-ash block truncate text-sm">{ep.guest}</span>
                  {ep.guestRole ? (
                    <span className="text-slate block truncate text-xs">
                      {ep.guestRole}
                    </span>
                  ) : null}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </SectionBody>
    </Section>
  );
}

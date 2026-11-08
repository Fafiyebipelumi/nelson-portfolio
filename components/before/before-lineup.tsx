import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { before } from "@/lib/content";
import { getEpisodes, getUpcomingEpisodes, type Episode } from "@/lib/episodes";
import { urlForImage } from "@/sanity/lib/image";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   BEFORE — SEASON ONE LINEUP
   ----------------------------------------------------------------------------
   The whole season, in episode-number order, from Sanity. Upcoming episodes
   (Publication date empty or in the future) show "Date to be confirmed" or
   their expected month. Released ones (date in the past) link through to
   their episode page and show the release date, so nothing disappears from
   /before once it goes out (the design has no separate archive). Until
   Sanity has any episodes, the illustrative lineup in content.ts is shown.
   The "Eight conversations." count always matches the cards on screen.

   Card: photo on a studio-grey ground fading into the card, an Episode pill,
   serif title, one-line blurb, then guest/duration and date lines. Raised on
   the same hard cream offset shadow as the credential cards.
   ========================================================================== */

const L = before.lineup;

export interface Card {
  key: string;
  index: string;
  title: string;
  blurb: string;
  guest: string;
  photo: string;
  /** True when the photo is a real guest photo (no studio-grey treatment). */
  guestPhoto: boolean;
  when: string;
  /** Episode page, for released episodes only. */
  href: string | null;
}

const COUNT = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

function monthYear(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()) || d <= new Date()) return null;
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function released(ep: Episode): boolean {
  if (!ep.publishedAt) return false;
  const d = new Date(ep.publishedAt);
  return !Number.isNaN(d.getTime()) && d <= new Date();
}

export function fromEpisode(ep: Episode): Card {
  const photo = urlForImage(ep.guestPhoto);
  const month = monthYear(ep.publishedAt);
  const out = released(ep);
  const day = out
    ? new Date(ep.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;
  return {
    key: ep.slug,
    index: String(ep.number).padStart(2, "0"),
    title: ep.title,
    blurb: ep.shortDescription,
    guest: [ep.guestName || L.guest, ep.duration || L.duration].join(". "),
    photo: photo ?? L.photo,
    guestPhoto: Boolean(photo),
    when: day ? `Out now. Released ${day}` : month ? `Expected ${month}` : `${L.date} / ${L.window}`,
    href: out ? `/before/${ep.slug}` : null,
  };
}

export async function BeforeLineup() {
  const [out, upcoming] = await Promise.all([getEpisodes(), getUpcomingEpisodes()]);
  const season = [...out, ...upcoming].sort((a, b) => a.number - b.number);
  const cards: Card[] =
    season.length > 0
      ? season.map(fromEpisode)
      : L.items.map((ep) => ({
          key: ep.index,
          index: ep.index,
          title: ep.title,
          blurb: ep.blurb,
          guest: `${L.guest}. ${L.duration}`,
          photo: L.photo,
          guestPhoto: false,
          when: `${L.date} / ${L.window}`,
          href: null,
        }));

  const n = cards.length;
  const sub = `${COUNT[n] ?? n} ${n === 1 ? "conversation" : "conversations"}. ${L.subTail}`;

  return (
    <section id="lineup" aria-label="Season one" className="bg-umber text-cream">
      <div className="gutter pt-16 pb-20 sm:pt-20 lg:pt-24 lg:pb-[7.5rem]">
        <Reveal>
          <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
            {L.headline}
          </h2>
          <p className="mt-4 font-sans text-base font-medium lg:text-[1.0625rem]">{sub}</p>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
          {cards.map((card) => (
            <StaggerItem key={card.key}>
              <EpisodeCard card={card} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** One lineup card. Shared with the episode page's "More from season one". */
export function EpisodeCard({ card }: { card: Card }) {
  return (
    <CardShell href={card.href}>
      <div
        className="relative aspect-[16/11] overflow-hidden"
        style={card.guestPhoto ? undefined : { background: "linear-gradient(180deg, #e4e4e2 0%, #b9b9b6 55%, #8d8c88 100%)" }}
      >
        <Image
          src={card.photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className={`object-cover ${card.guestPhoto ? "" : "mix-blend-multiply"}`}
          style={{ objectPosition: "50% 22%" }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#2a241b]" />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-1 pb-6">
        <p className="w-fit rounded-full bg-[#3a3833] px-2.5 py-1 font-sans text-[0.6875rem] font-medium">
          Episode {card.index}
        </p>
        <h3 className="mt-3 w-[calc(100%/0.88)] origin-left font-serif text-[1.3rem] leading-[1.05] [scale:0.88_1] [-webkit-text-stroke:0.4px_currentColor]">
          {card.title}
        </h3>
        <p className="text-sand mt-2 font-sans text-base leading-[1.35] sm:text-[0.9375rem]">{card.blurb}</p>
        <p className="text-stone mt-3 font-sans text-[0.8125rem] leading-snug sm:text-[0.75rem]">{card.guest}</p>
        <p className={`mt-1 font-sans text-[0.75rem] leading-snug sm:text-[0.6875rem] ${card.href ? "text-cream font-medium" : "text-stone"}`}>
          {card.when}
        </p>
      </div>
    </CardShell>
  );
}

const CARD =
  "flex h-full flex-col overflow-hidden rounded-[7px] bg-[#2a241b] shadow-[4px_4px_0_0_#fff8e1]";

/* Released episodes are links that press into their shadow on hover, like
   the buttons; upcoming ones are plain cards. */
function CardShell({ href, children }: { href: string | null; children: ReactNode }) {
  if (!href) return <article className={CARD}>{children}</article>;
  return (
    <Link
      href={href}
      className={`${CARD} transition-[transform,box-shadow] duration-200 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#fff8e1]`}
    >
      <article className="flex h-full flex-col">{children}</article>
    </Link>
  );
}

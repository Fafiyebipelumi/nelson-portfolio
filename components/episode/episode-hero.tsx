import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { before } from "@/lib/content";
import { ActionButton, PlayIcon } from "../action-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   EPISODE — HERO  (BEFORE system, November 2026)
   ----------------------------------------------------------------------------
   The /before hero's ground carried onto each episode: dark green turning
   violet to the right, the amber sun breaking in at the top-right. Left:
   back to the season, the Episode pill, the serif title, the guest line in
   the hero's heavy sans, release date and length, topics, then the listen
   actions. Right: the guest (or cover) photo as a lineup card blown up, on
   the cream offset shadow. Without a guest photo it falls back to the
   lineup's placeholder, multiplied onto studio grey.
   ========================================================================== */

export interface Platform {
  label: string;
  href: string;
}

export function EpisodeHero({
  index,
  title,
  guest,
  meta,
  topics,
  photo,
  hasPlayer,
  platforms,
}: {
  index: string;
  title: string;
  guest: string | null;
  meta: string;
  topics: string[];
  /** Sanity image URL, or null for the placeholder. */
  photo: string | null;
  hasPlayer: boolean;
  platforms: Platform[];
}) {
  const arrow = (
    <ArrowUpRight
      className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );

  return (
    <section
      id="top"
      className="text-cream relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 100% 100%, #9d45ff 0%, #7b37d6 28%, transparent 62%), linear-gradient(100deg, #1b2220 0%, #1d2321 42%, #3a2861 64%, #7a3ad8 86%, #9343f6 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="before-sun absolute -top-[7.5rem] -right-[6.5rem] size-[12rem] rounded-full border-[3px] border-[#f3d38a] sm:-top-[8rem] sm:-right-[6rem] sm:size-[17rem]"
        style={{ background: "radial-gradient(circle at 30% 70%, #f2a514 0%, #d58b0b 55%, #b8780c 100%)" }}
      />

      <div className="gutter relative grid items-center gap-12 pt-28 pb-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16 lg:pt-[10rem] lg:pb-16">
        <div className="relative z-10">
          <Reveal>
            <Link
              href="/before#lineup"
              className="text-stone hover:text-cream group inline-flex items-center gap-2 font-sans text-[0.9375rem] font-medium transition-colors"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
              Season one
            </Link>
          </Reveal>

          <Reveal delay={0.04}>
            <p className="mt-8 inline-flex rounded-full bg-[#3a3833] px-3.5 py-1.5 font-sans text-[0.8125rem] font-medium tracking-[-0.01em]">
              BEFORE · Episode {index}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 w-[calc(100%/0.88)] origin-left font-serif text-[clamp(3rem,6.2vw,6.25rem)] leading-[0.95] tracking-[-0.03em] [scale:0.88_1] [-webkit-text-stroke:0.6px_currentColor]">
              {title}
            </h1>
          </Reveal>

          {guest ? (
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[40rem] font-sans text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
                {guest}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.16}>
            <p className="text-stone mt-4 font-sans text-[1.0625rem] lg:text-[1.1875rem]">{meta}</p>
          </Reveal>

          {topics.length > 0 ? (
            <Reveal delay={0.18}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-cream/30 px-3 py-1 font-sans text-[0.8125rem] font-medium"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {hasPlayer || platforms.length > 0 ? (
            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                {hasPlayer ? (
                  <ActionButton href="#listen" variant="light">
                    Play episode
                    <span className="[&_circle]:fill-umber [&_path]:fill-cream">
                      <PlayIcon />
                    </span>
                  </ActionButton>
                ) : null}
                {platforms.map((p, i) => (
                  <ActionButton key={p.label} href={p.href} variant={!hasPlayer && i === 0 ? "light" : "dark"}>
                    {p.label}
                    {arrow}
                  </ActionButton>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* Guest card */}
        <Reveal delay={0.1} y={28} className="relative z-10 mx-auto w-full max-w-[20rem] sm:max-w-[26rem] lg:mr-0">
          <div className="overflow-hidden rounded-[7px] bg-[#2a241b] shadow-[6px_6px_0_0_#fff8e1]">
            <div
              className="relative aspect-[4/5]"
              style={photo ? undefined : { background: "linear-gradient(180deg, #e4e4e2 0%, #b9b9b6 55%, #8d8c88 100%)" }}
            >
              <Image
                src={photo ?? before.lineup.photo}
                alt={guest ? `${guest.split(",")[0]}` : ""}
                fill
                priority
                sizes="(min-width: 1024px) 26rem, 90vw"
                className={`object-cover ${photo ? "" : "mix-blend-multiply"}`}
                style={{ objectPosition: "50% 22%" }}
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-[#2a241b]" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 pt-1 pb-5">
              <p className="font-serif text-[1.6rem] leading-none uppercase [-webkit-text-stroke:0.4px_currentColor]">
                Before
              </p>
              <p className="text-stone font-sans text-[0.8125rem] font-medium">{before.hero.eyebrow}</p>
            </div>
          </div>
        </Reveal>
      </div>
      <Stripes from="transparent" to="var(--color-umber)" className="relative z-10" />
    </section>
  );
}

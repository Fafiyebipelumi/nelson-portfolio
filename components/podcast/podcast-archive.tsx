"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { type Episode, episodeCover } from "@/lib/episodes";
import { Section, SectionBody, SectionLabel } from "../section";
import { PodcastCover } from "./podcast-cover";

/* ============================================================================
   E — EPISODE ARCHIVE
   ----------------------------------------------------------------------------
   Reserved until three or more episodes are live (brief §4.1), so it renders
   nothing below that threshold. Once populated it is a searchable grid with
   topic filters (brief §4.1 E): a text search over title, guest and summary,
   and a row of topic chips derived from each episode's `topics`. The chip row
   only appears once episodes actually carry topics. Each card shows the cover
   art small (brief §4.2) and links to the episode page.
   ========================================================================== */

export function PodcastArchive({ episodes }: { episodes: Episode[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);

  const topics = useMemo(() => {
    const set = new Set<string>();
    for (const ep of episodes) for (const t of ep.topics ?? []) set.add(t);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [episodes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return episodes.filter((ep) => {
      const matchesTopic = !topic || (ep.topics ?? []).includes(topic);
      const matchesQuery =
        !q ||
        [ep.title, ep.guestName, ep.guestRole, ep.shortDescription]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(q));
      return matchesTopic && matchesQuery;
    });
  }, [episodes, query, topic]);

  /* Brief §4.1: hidden or reserved until three or more episodes exist. */
  if (episodes.length < 3) return null;

  return (
    <Section id="archive" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="04" label="Archive" tone="podcast" />

        {/* Controls */}
        <div className="mb-12 flex flex-col gap-6">
          <div className="border-rule-ink focus-within:border-airwave flex items-center gap-3 border-b pb-3 sm:max-w-md">
            <Search
              className="text-slate size-4 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <label htmlFor="archive-search" className="sr-only">
              Search episodes
            </label>
            <input
              id="archive-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search episodes"
              className="text-bone placeholder:text-slate/70 w-full bg-transparent text-base outline-none"
            />
          </div>

          {topics.length > 0 ? (
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by topic">
              <button
                type="button"
                onClick={() => setTopic(null)}
                aria-pressed={topic === null}
                className={`font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
                  topic === null
                    ? "bg-airwave text-ink"
                    : "border-rule-ink text-ash hover:text-bone border"
                } px-3.5 py-2`}
              >
                All
              </button>
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  aria-pressed={topic === t}
                  className={`font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
                    topic === t
                      ? "bg-airwave text-ink"
                      : "border-rule-ink text-ash hover:text-bone border"
                  } px-3.5 py-2`}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-ash border-rule-ink border-t pt-10 text-base">
            No episodes match that search yet.
          </p>
        ) : (
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ep) => {
              const coverUrl = episodeCover(ep);
              return (
                <div key={ep.slug} className="bg-ink-raised border-rule-ink border">
                  <Link
                    href={`/podcast/${ep.slug}`}
                    className="hover:bg-ink-soft flex h-full flex-col p-7 transition-colors sm:p-8"
                  >
                    <div className="flex items-start gap-4">
                      {/* Cover art, small (brief §4.2) */}
                      <div className="border-rule-ink w-16 shrink-0 overflow-hidden border sm:w-20">
                        {coverUrl ? (
                          <div className="relative aspect-square">
                            <Image
                              src={coverUrl}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <PodcastCover variant="compact" />
                        )}
                      </div>

                      <div className="flex flex-1 items-baseline justify-between">
                        <span className="eyebrow text-airwave">
                          Episode {ep.number}
                        </span>
                        {ep.duration ? (
                          <span className="eyebrow text-slate">{ep.duration}</span>
                        ) : null}
                      </div>
                    </div>

                    <h3 className="text-bone mt-6 text-xl font-medium tracking-[-0.02em]">
                      {ep.title}
                    </h3>
                    {ep.guestName ? (
                      <p className="text-ash mt-3 text-sm">{ep.guestName}</p>
                    ) : null}
                    <p className="text-ash mt-4 text-sm leading-relaxed">
                      {ep.shortDescription}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </SectionBody>
    </Section>
  );
}

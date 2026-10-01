"use client";

/* ============================================================================
   I — NEWSLETTER  (Beehiiv, owned audience)
   ----------------------------------------------------------------------------
   Single email field posting to /api/subscribe, which talks to Beehiiv
   server-side. Never fakes success: an unconfigured or failed signup surfaces
   an error. Accessible: labelled field, aria-live status, focus preserved.
   ========================================================================== */

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal } from "../motion-primitives";

const COPY = podcast.newsletter;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function PodcastNewsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? COPY.errorBody);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : COPY.errorBody);
    }
  }

  return (
    <Section id="newsletter" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="07" label={podcast.newsletter.eyebrow} tone="podcast" />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="text-title text-bone font-medium">{COPY.headline}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-ash mt-6 max-w-md text-base leading-relaxed">
                {COPY.body}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            {status === "success" ? (
              <p className="text-airwave flex items-center gap-3 text-lg">
                <Check className="size-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {COPY.successBody}
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={COPY.placeholder}
                    aria-invalid={status === "error" || undefined}
                    className="bg-ink-raised border-rule-ink text-bone placeholder:text-slate/70 focus-visible:border-airwave w-full border px-4 py-3.5 text-base transition-colors outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group bg-airwave text-ink hover:bg-bone inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-300 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : COPY.submitLabel}
                    <ArrowRight
                      className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <p aria-live="polite" className="text-airwave min-h-[1.25rem] text-sm">
                  {status === "error" ? message : ""}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { before } from "@/lib/content";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   BEFORE — NEWSLETTER  (Beehiiv)
   ----------------------------------------------------------------------------
   Cream band: serif title left, the pitch and the form right. Posts to
   /api/subscribe, which talks to Beehiiv server-side. Never fakes success:
   an unconfigured or failed signup surfaces an error. Labelled field,
   aria-live status. Closes on the stripes into the dark footer.
   ========================================================================== */

const COPY = before.newsletter;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function BeforeNewsletter() {
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
    <section id="newsletter" aria-label="Newsletter" className="bg-cream text-umber scroll-mt-24">
      <div className="gutter grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[auto_minmax(0,40rem)] lg:gap-12 lg:py-24 xl:gap-16">
        <Reveal>
          <h2 className="origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1] lg:whitespace-nowrap">
            {COPY.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="font-sans text-base leading-[1.45] font-medium">{COPY.body}</p>

          {status === "success" ? (
            <p role="status" className="mt-5 inline-flex items-center gap-2 font-sans text-base font-medium">
              <Check className="size-5" strokeWidth={2} aria-hidden="true" />
              {COPY.successBody}
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <label htmlFor="before-email" className="sr-only">
                Email address
              </label>
              <input
                id="before-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={COPY.placeholder}
                aria-invalid={status === "error"}
                aria-describedby="before-email-status"
                className="h-12 min-w-0 flex-1 rounded-[7px] border border-[#cfc8b6] bg-transparent px-4 font-sans text-base outline-none placeholder:text-[#a8a294] focus:border-umber"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-umber text-cream h-12 rounded-[7px] px-7 font-sans text-base font-medium shadow-[4px_4px_0_0_#8f8a7d] transition-[transform,box-shadow] duration-200 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#8f8a7d] disabled:opacity-60"
              >
                {status === "submitting" ? "Subscribing…" : COPY.submitLabel}
              </button>
            </form>
          )}
          <p id="before-email-status" aria-live="polite" className="mt-3 min-h-[1.25rem] font-sans text-sm text-[#9a3b2a]">
            {status === "error" ? message : ""}
          </p>
        </Reveal>
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}

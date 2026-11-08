"use client";

/* ============================================================================
   CONTACT — ENQUIRY FORM  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band: the serif heading on the left, the form on the right (name and
   email, organisation and desk, website, message), the privacy line and a
   Send button. Rounded light fields with a fine warm border.

   Posts to the form service in NEXT_PUBLIC_PODCAST_FORM_ENDPOINT (Formspree,
   recipient support@tnajulo.com), tagged with the chosen desk's subject.
   Real validation, focus on the first error, and no silent success: an
   unconfigured or failed submit says so. Other pages can preselect a desk
   with ?desk=<key> (e.g. /contact?desk=speaking#enquiry).
   ========================================================================== */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { contactPage } from "@/lib/content";
import { actionButtonClasses } from "../action-button";
import { Stripes } from "../stripes";

const ENDPOINT = process.env.NEXT_PUBLIC_PODCAST_FORM_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = ["name", "email", "message"] as const;

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-[10px] border border-[#c9c3b4] bg-[#fffdf1] px-4 font-sans text-base text-umber outline-none transition-[border-color,box-shadow] focus-visible:border-umber focus-visible:shadow-[0_0_0_3px_rgb(21_18_12/0.08)]";
const label = "font-sans text-[1.0625rem] font-medium text-umber/85";

export function ContactForm() {
  const F = contactPage.form;
  const desks = contactPage.desks;
  const deskRef = useRef<HTMLSelectElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  /* Preselect the desk from ?desk=… when arriving from another page. */
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("desk");
    if (wanted && deskRef.current && desks.some((d) => d.key === wanted)) deskRef.current.value = wanted;
  }, [desks]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found: Record<string, string> = {};
    for (const name of REQUIRED) {
      const value = String(data.get(name) ?? "").trim();
      if (!value) found[name] = "This field is required.";
      else if (name === "email" && !EMAIL_RE.test(value))
        found[name] = "Enter a valid email address.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }

    const chosen = desks.find((d) => d.key === data.get("deskKey")) ?? desks[0];
    setStatus("submitting");
    try {
      if (!ENDPOINT) throw new Error("Form endpoint not configured");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          desk: chosen.title,
          _subject: chosen.subject,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  const err = (name: string) =>
    errors[name] ? (
      <p
        id={`${name}-error`}
        className="mt-1.5 font-sans text-sm text-[#a3341f]"
      >
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="bg-cream text-umber scroll-mt-24"
    >
      <div className="gutter-tight grid gap-10 pt-16 pb-20 lg:grid-cols-[40.6%_minmax(0,1fr)] lg:gap-0 lg:pt-[8.1rem] lg:pb-[7.4rem]">
        <h2
          id="enquiry-heading"
          className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.6rem,4.75vw,4.6rem)] leading-none tracking-[-0.05em] [scale:0.88_1] lg:pt-1"
        >
          {F.heading}
        </h2>

        {status === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            className="flex flex-col items-start gap-4 rounded-[10px] border border-[#c9c3b4] bg-[#fffdf1] p-8 outline-none"
          >
            <span className="bg-umber text-cream flex size-11 items-center justify-center rounded-full">
              <Check className="size-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <h3 className="font-serif text-[2.2rem] leading-none [scale:0.88_1] origin-left">
              {F.successTitle}
            </h3>
            <p className="font-sans text-[1.0625rem] leading-[1.45]">
              {F.successBody}
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid gap-x-7 gap-y-7 sm:grid-cols-2"
          >
            <div>
              <label htmlFor="name" className={label}>
                {F.labels.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`${field} mt-3 h-[3.25rem]`}
                {...aria("name")}
              />
              {err("name")}
            </div>
            <div>
              <label htmlFor="email" className={label}>
                {F.labels.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`${field} mt-3 h-[3.25rem]`}
                {...aria("email")}
              />
              {err("email")}
            </div>
            <div>
              <label htmlFor="organisation" className={label}>
                {F.labels.organisation}
              </label>
              <input
                id="organisation"
                name="organisation"
                type="text"
                autoComplete="organization"
                className={`${field} mt-3 h-[3.25rem]`}
              />
            </div>
            <div>
              <label htmlFor="desk" className={label}>
                {F.labels.desk}
              </label>
              <select
                id="desk"
                name="deskKey"
                ref={deskRef}
                defaultValue={desks[0].key}
                className={`${field} mt-3 h-[3.25rem] appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='12'%20height='12'%20fill='none'%20stroke='%2315120c'%20stroke-opacity='.55'%20stroke-width='1.5'%3E%3Cpath%20d='M2%204l4%204%204-4'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 text-[0.9375rem]`}
              >
                {desks.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="website" className={label}>
                {F.labels.website}
              </label>
              <input
                id="website"
                name="website"
                type="url"
                autoComplete="url"
                className={`${field} mt-3 h-[3.25rem]`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={label}>
                {F.labels.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`${field} mt-3 h-[8.3rem] resize-none py-3`}
                {...aria("message")}
              />
              {err("message")}
            </div>

            <div className="sm:col-span-2">
              <p className={`${label} mt-2`}>
                {F.privacy.before}
                {F.privacy.privacyHref ? (
                  <Link
                    href={F.privacy.privacyHref}
                    className="underline underline-offset-2"
                  >
                    {F.privacy.link}
                  </Link>
                ) : (
                  <span className="underline underline-offset-2">
                    {F.privacy.link}
                  </span>
                )}
              </p>
              {status === "error" ? (
                <p
                  className="mt-4 font-sans text-sm text-[#a3341f]"
                  aria-live="polite"
                >
                  Something went wrong. Please try again, or email{" "}
                  {contactPage.email}.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "submitting"}
                className={actionButtonClasses(
                  "ink",
                  "md",
                  "mt-7 px-[1.1rem]! disabled:opacity-60",
                )}
              >
                {status === "submitting" ? "Sending…" : F.submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}

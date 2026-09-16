"use client";

/* ============================================================================
   APPLY FORM
   ----------------------------------------------------------------------------
   The one genuinely interactive piece on the site, so it is the one place a
   client component is warranted.

   Submission model, by design of the prototype:
   • If NEXT_PUBLIC_PODCAST_FORM_ENDPOINT is set (a Formspree/Tally URL), the
     form POSTs there as JSON — it works for real the moment that value exists.
   • If it is not set, the submit is SIMULATED (a short delay, then success) so
     the concept demos cleanly without a live backend and without silently
     pretending to send anything anywhere.

   Accessibility: native <form> with real labels, required + type validation,
   inline error text tied to each field via aria-describedby, a status region
   that announces the result, and focus moved to the confirmation on success.
   ========================================================================== */

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { podcast } from "@/lib/content";

const FIELDS = podcast.apply.form.fields;
const COPY = podcast.apply.form;

const ENDPOINT = process.env.NEXT_PUBLIC_PODCAST_FORM_ENDPOINT;

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    for (const field of FIELDS) {
      const value = String(data.get(field.name) ?? "").trim();
      if (field.required && !value) {
        next[field.name] = "This field is required.";
      } else if (field.type === "email" && value && !EMAIL_RE.test(value)) {
        next[field.name] = "Enter a valid email address.";
      }
    }
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const payload = Object.fromEntries(data.entries());

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        /* No endpoint configured — simulate a successful submission so the
           prototype behaves realistically. Swap in a real endpoint to send. */
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border-signal-bright/40 flex flex-col items-start gap-5 border p-8 sm:p-10"
      >
        <span className="border-signal-bright/50 text-signal-bright flex size-11 items-center justify-center rounded-full border">
          <Check className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="text-bone text-2xl font-medium tracking-[-0.02em]">
          {COPY.successTitle}
        </h3>
        <p className="text-ash max-w-md text-base leading-relaxed">
          {COPY.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {FIELDS.map((field) => {
        const errorId = `${field.name}-error`;
        const hasError = Boolean(errors[field.name]);
        const shared = {
          id: field.name,
          name: field.name,
          required: field.required,
          placeholder: field.placeholder,
          "aria-invalid": hasError || undefined,
          "aria-describedby": hasError ? errorId : undefined,
          className:
            "bg-ink-raised border-rule-ink text-bone placeholder:text-slate/70 focus-visible:border-signal-bright w-full border px-4 py-3.5 text-base transition-colors duration-200 outline-none",
        };

        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label
              htmlFor={field.name}
              className="eyebrow text-ash flex items-baseline gap-2"
            >
              {field.label}
              {!field.required ? (
                <span className="text-slate normal-case">— optional</span>
              ) : null}
            </label>

            {field.type === "textarea" ? (
              <textarea {...shared} rows={4} className={`${shared.className} resize-none`} />
            ) : (
              <input
                {...shared}
                type={field.type}
                autoComplete={field.autoComplete}
              />
            )}

            {hasError ? (
              <p id={errorId} className="text-signal-bright text-sm">
                {errors[field.name]}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Announces failures without stealing focus. */}
      <div aria-live="polite" className="sr-only">
        {status === "error" ? COPY.errorBody : ""}
      </div>

      {status === "error" ? (
        <p className="text-signal-bright text-sm">{COPY.errorBody}</p>
      ) : null}

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group bg-signal-bright text-ink hover:bg-bone inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-medium tracking-[0.01em] transition-colors duration-300 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : COPY.submitLabel}
          <ArrowRight
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>

        <p className="text-slate max-w-xs text-xs leading-relaxed">
          {COPY.consent}
        </p>
      </div>
    </form>
  );
}

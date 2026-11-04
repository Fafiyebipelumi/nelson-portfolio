"use client";

/* ============================================================================
   ENQUIRY FORM
   ----------------------------------------------------------------------------
   Reusable ink-surface form (speaking bookings and the /contact enquiry).
   Supports text, email, url, textarea and select fields. Posts to the form
   service in NEXT_PUBLIC_PODCAST_FORM_ENDPOINT, whose recipient is
   support@tnajulo.com. Same contract as the guest form: real validation, a
   tagged subject, and no silent success — an unconfigured or failed submit
   surfaces an error.
   ========================================================================== */

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { ApplyField } from "@/lib/content";

const ENDPOINT = process.env.NEXT_PUBLIC_PODCAST_FORM_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({
  fields,
  subject,
  submitLabel = "Send enquiry",
  successTitle = "Enquiry received.",
  successBody = "Thank you. It has reached the right desk and every enquiry is read.",
  note,
}: {
  fields: readonly ApplyField[];
  subject: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  /** Small print under the submit button, e.g. how details are used. */
  note?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found: Record<string, string> = {};
    for (const field of fields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (field.required && !value) found[field.name] = "This field is required.";
      else if (field.type === "email" && value && !EMAIL_RE.test(value))
        found[field.name] = "Enter a valid email address.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      if (!ENDPOINT) throw new Error("Form endpoint not configured");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data.entries()), _subject: subject }),
      });
      if (!res.ok) throw new Error("Request failed");
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
        <h3 className="text-bone text-2xl font-medium tracking-[-0.02em]">{successTitle}</h3>
        <p className="text-ash max-w-md text-base leading-relaxed">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {fields.map((field) => {
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
            "bg-ink-raised border-rule-ink text-bone placeholder:text-slate focus-visible:border-signal-bright w-full border px-4 py-3.5 text-base transition-colors outline-none",
        };
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={field.name} className="eyebrow text-ash flex items-baseline gap-2">
              {field.label}
              {!field.required ? <span className="text-slate normal-case">(optional)</span> : null}
            </label>
            {field.type === "textarea" ? (
              <textarea {...shared} rows={4} className={`${shared.className} resize-none`} />
            ) : field.type === "select" ? (
              <select
                {...shared}
                defaultValue=""
                className={`${shared.className} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='12'%20height='12'%20fill='none'%20stroke='%2357cbb8'%20stroke-width='1.5'%3E%3Cpath%20d='M2%204l4%204%204-4'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 invalid:text-slate [&_option]:bg-ink [&_option]:text-bone`}
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input {...shared} type={field.type} autoComplete={field.autoComplete} />
            )}
            {hasError ? (
              <p id={errorId} className="text-signal-bright text-sm">
                {errors[field.name]}
              </p>
            ) : null}
          </div>
        );
      })}

      {status === "error" ? (
        <p className="text-signal-bright text-sm" aria-live="polite">
          Something went wrong. Please try again, or email support@tnajulo.com.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group bg-signal-bright text-ink hover:bg-signal cursor-pointer mt-2 inline-flex w-fit items-center gap-2.5 px-7 py-4 text-sm font-medium transition-colors duration-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
        <ArrowRight
          className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {note ? <p className="text-slate max-w-sm text-xs leading-relaxed">{note}</p> : null}
    </form>
  );
}

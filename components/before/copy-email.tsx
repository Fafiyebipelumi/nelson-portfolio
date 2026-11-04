"use client";

import { useState } from "react";

/* Copies an address to the clipboard and confirms inline. Falls back to a
   mailto link when the Clipboard API is unavailable or refused. */
export function CopyEmail({ email, subject, label }: { email: string; subject: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      setTimeout(() => setState("idle"), 2200);
    } catch {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="bg-umber text-cream border-cream/70 inline-flex items-center gap-2 rounded-[7px] border px-5 py-2.5 font-sans text-[0.9375rem] font-medium shadow-[4px_4px_0_0_#ece5cf] transition-[transform,box-shadow] duration-200 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ece5cf] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    >
      <span aria-live="polite">{state === "copied" ? `Copied ${email}` : label}</span>
    </button>
  );
}

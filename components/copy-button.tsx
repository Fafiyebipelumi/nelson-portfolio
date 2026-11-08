"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { IoCopy } from "react-icons/io5";
import { actionButtonClasses, type Variant } from "./action-button";

/* ============================================================================
   COPY BUTTON
   ----------------------------------------------------------------------------
   The design's "Copy" button: copies a block of text (a bio, a boilerplate)
   to the clipboard and confirms inline for a couple of seconds. Styled as an
   ActionButton. If the Clipboard API is unavailable or refused, it selects
   the text in a hidden textarea and uses the legacy copy command.
   ========================================================================== */

export function CopyButton({
  text,
  label = "Copy",
  variant = "light",
  className = "",
}: {
  text: string;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={copy} className={actionButtonClasses(variant, "md", className)}>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
      {copied ? (
        <Check className="size-[1.15rem]" strokeWidth={2.25} aria-hidden="true" />
      ) : (
        <IoCopy className="size-[1.15rem]" aria-hidden="true" />
      )}
    </button>
  );
}

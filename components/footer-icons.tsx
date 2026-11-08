/* ============================================================================
   FOOTER ICONS
   ----------------------------------------------------------------------------
   Inline SVGs for the footer's two icon rows, drawn to match the Figma
   footer: cream social glyphs, and the podcast platforms in their own
   brand colours. Decorative; the links around them carry the labels.
   ========================================================================== */

const DARK = "#15120c";
const CREAM = "#fff8e1";

export function SocialIcon({ id }: { id: string }) {
  switch (id) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill={CREAM} />
          <path
            fill={DARK}
            transform="translate(6.6 6.6) scale(0.45)"
            d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zM17.6 20.65h2.04L6.48 3.24H4.3z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill={CREAM} />
          <path
            fill={DARK}
            d="M13.4 24v-8.6h2.9l.45-3.4H13.4V9.9c0-1 .3-1.6 1.7-1.6h1.8V5.2c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4V12H7v3.4h3v8.4c1.1.2 2.3.2 3.4.2z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <rect width="24" height="24" rx="6" fill={CREAM} />
          <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke={DARK} strokeWidth="2.2" />
          <circle cx="12" cy="12" r="3.3" fill="none" stroke={DARK} strokeWidth="2.2" />
          <circle cx="16.3" cy="7.7" r="1.1" fill={DARK} />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill={CREAM} />
          <rect x="6.9" y="10" width="2.4" height="7.2" fill={DARK} />
          <circle cx="8.1" cy="7.6" r="1.45" fill={DARK} />
          <path
            fill={DARK}
            d="M11.3 10h2.3v1c.4-.7 1.3-1.2 2.4-1.2 2 0 2.9 1.2 2.9 3.4v4h-2.4v-3.6c0-1-.3-1.7-1.2-1.7-.9 0-1.6.6-1.6 1.8v3.5h-2.4z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function ListenIcon({ id }: { id: string }) {
  switch (id) {
    case "apple":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <defs>
            <linearGradient id="nta-apple-pod" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f452ff" />
              <stop offset="1" stopColor="#832bc1" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="5.5" fill="url(#nta-apple-pod)" />
          <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
            <path d="M7.6 15.6a6.2 6.2 0 1 1 8.8 0" />
            <path d="M9.6 13.6a3.3 3.3 0 1 1 4.8 0" />
          </g>
          <circle cx="12" cy="10.6" r="1.6" fill="#fff" />
          <rect x="10.85" y="13.1" width="2.3" height="6.4" rx="1.15" fill="#fff" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <rect y="3.5" width="24" height="17" rx="5" fill="#ff0000" />
          <path d="M9.6 8.2v7.6l6.4-3.8z" fill="#fff" />
        </svg>
      );
    case "rss":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#fff" />
          <circle cx="6.6" cy="17.4" r="2.1" fill={DARK} />
          <g fill="none" stroke={DARK} strokeWidth="2.6" strokeLinecap="round">
            <path d="M4.6 11.2a8.2 8.2 0 0 1 8.2 8.2" />
            <path d="M4.6 5.4a14 14 0 0 1 14 14" />
          </g>
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="#1ed760" />
          <g fill="none" stroke={DARK} strokeLinecap="round">
            <path d="M5.6 9.1c4.2-1.3 9.1-.9 12.8 1.1" strokeWidth="2.1" />
            <path d="M6.3 12.5c3.5-1 7.4-.6 10.4 1" strokeWidth="1.8" />
            <path d="M7 15.6c2.8-.7 5.6-.4 7.9.8" strokeWidth="1.5" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

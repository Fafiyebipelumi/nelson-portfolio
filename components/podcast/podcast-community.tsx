import { podcast } from "@/lib/content";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   J — COMMUNITY
   ----------------------------------------------------------------------------
   A slim social strip (brief §4.1). No verbatim copy was supplied, so this is
   kept minimal and the handles are placeholders to confirm with Nelson.
   ========================================================================== */

const community = podcast.community;

export function PodcastCommunity() {
  return (
    <section data-tone="ink" className="on-ink bg-ink text-bone">
      <div className="gutter border-rule-ink flex flex-col gap-6 border-t py-10 sm:flex-row sm:items-center sm:justify-between">
        <Reveal>
          <p className="text-bone text-lg font-medium tracking-[-0.02em]">
            {community.headline}
          </p>
        </Reveal>

        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {community.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="link-draw text-ash hover:text-airwave font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

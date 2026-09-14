/* ============================================================================
   SIGNAL CHAIN — Normal → Signal → Context → Action
   ----------------------------------------------------------------------------
   The one place on the page that earns a bespoke interaction, because it is
   also the clearest expression of what BEEKON actually does.

   The interaction is a single gesture: a hairline draws left-to-right across
   the row and each stage lights as the line reaches it. That is all. No loop,
   no hover state, no scrub — it happens once, then sits still and readable.

   On mobile the row becomes a stack and each stage carries its own rule, so
   the sequence still reads top-to-bottom without the shared line.
   ========================================================================== */

import { myhives } from "@/lib/content";
import { DrawRule, Stagger, StaggerItem } from "./motion-primitives";

export function SignalChain() {
  return (
    <div className="relative">
      {/* Shared rule — desktop only, where the stages sit on one baseline. */}
      <DrawRule className="bg-rule-ink-strong absolute inset-x-0 top-0 hidden h-px lg:block" />

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {myhives.chain.map((stage) => (
          <StaggerItem
            key={stage.index}
            className="border-rule-ink relative border-t pt-7 pr-0 pb-9 sm:pr-8 lg:border-t-0 lg:pb-0 lg:pr-10"
          >
            {/* Node sits on the rule above — the item's own on mobile,
                the shared one on desktop. */}
            <span
              aria-hidden="true"
              className="bg-signal-bright absolute top-0 left-0 size-[7px] -translate-y-1/2 rounded-full"
            />

            <span className="eyebrow text-slate block">{stage.index}</span>

            <h4 className="text-bone mt-4 text-xl font-medium tracking-[-0.02em] uppercase sm:text-2xl">
              {stage.name}
            </h4>

            <p className="text-ash mt-3 max-w-xs text-sm leading-relaxed">
              {stage.body}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

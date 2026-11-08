/* ============================================================================
   BUBBLE CLIP
   ----------------------------------------------------------------------------
   A speech-bubble outline as a CSS clip-path polygon: a rounded card with a
   tail dropping from its bottom-left or bottom-right corner, and a soft inner
   curve where the tail leaves the card. Corners, tail and curve are in fixed
   px (calc against 100%), so the shape holds at any card size. The element
   needs bottom padding equal to `tail` to make room for it.
   Used by the BEFORE host cards and the press page's standard bio photo.
   ========================================================================== */

type Pt = [x: number, fromRight: boolean, y: number, fromBottom: boolean];

export function bubbleClip(
  side: "left" | "right",
  {
    radius = 16,
    tail = 64,
    join = 14,
  }: { radius?: number; tail?: number; join?: number } = {},
) {
  const pts: Pt[] = [];
  const arc = (
    cx: number,
    cxR: boolean,
    cy: number,
    cyB: boolean,
    a0: number,
    a1: number,
  ) => {
    for (let i = 0; i <= 6; i++) {
      const a = ((a0 + ((a1 - a0) * i) / 6) * Math.PI) / 180;
      // x grows rightwards, y grows downwards; offsets measured from the chosen edge.
      const dx = Math.cos(a) * radius;
      const dy = Math.sin(a) * radius;
      pts.push([cxR ? cx - dx : cx + dx, cxR, cyB ? cy - dy : cy + dy, cyB]);
    }
  };

  // Built for a tail on the right, mirrored for the left one.
  arc(radius, false, radius, false, 180, 270); // top-left
  arc(radius, true, radius, false, 270, 360); // top-right
  pts.push([0, true, 0, true]); // tail tip, bottom-right
  // Inner curve where the diagonal meets the card's bottom edge (quadratic,
  // control point at the corner).
  const len = Math.hypot(tail, tail);
  const p0: [number, number] = [
    tail - (tail / len) * join,
    tail - (tail / len) * join,
  ];
  const p2: [number, number] = [tail + join, tail];
  for (let i = 0; i <= 5; i++) {
    const t = i / 5;
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * tail + t ** 2 * p2[0];
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * tail + t ** 2 * p2[1];
    pts.push([x, true, y, true]);
  }
  arc(radius, false, tail + radius, true, 90, 180); // bottom-left of the card

  const fmt = (v: number, fromEnd: boolean) =>
    fromEnd ? `calc(100% - ${v.toFixed(2)}px)` : `${v.toFixed(2)}px`;
  return `polygon(${pts
    .map(
      ([x, xr, y, yb]) => `${fmt(x, side === "left" ? !xr : xr)} ${fmt(y, yb)}`,
    )
    .join(", ")})`;
}

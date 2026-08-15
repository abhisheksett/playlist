// Layered backdrop: hero photo -> soft vignette -> film grain, in that
// stacking order, each -z layer independent so any of them can be swapped
// or animated later without touching the others.

export function Background() {
  return (
    <>
      {/* Portrait image below sm, landscape image at sm and up — shown in
          full via bg-contain so the exact photo is never cropped; any
          letterboxing falls back to the page's dark background color. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30 bg-contain bg-center bg-no-repeat sm:hidden"
        style={{ backgroundImage: "url(/hero-mobile.png)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30 hidden bg-contain bg-center bg-no-repeat sm:block"
        style={{ backgroundImage: "url(/hero.png)" }}
      />

      {/* Rising smoke — a few soft blurred puffs drifting up from the
          ashtray, screen-blended so they read as wispy smoke against the
          dark photo rather than opaque white blobs. */}
      <div
        aria-hidden
        className="pointer-events-none fixed -z-25 mix-blend-screen"
        style={{ left: "58%", top: "58%", width: "10%", height: "26%" }}
      >
        <span className="smoke-puff smoke-puff-1" />
        <span className="smoke-puff smoke-puff-2" />
        <span className="smoke-puff smoke-puff-3" />
      </div>

      {/* Top-to-bottom + bottom-to-top linear falloff so header and player
          text stay legible against a busy photo. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,6,3,0.55) 0%, rgba(12,6,3,0) 32%), " +
            "linear-gradient(to top, rgba(12,6,3,0.9) 0%, rgba(12,6,3,0.35) 22%, rgba(12,6,3,0) 48%)",
        }}
      />

      {/* Radial vignette to pull focus toward center and darken the edges. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 45%, rgba(8,4,2,0) 40%, rgba(8,4,2,0.5) 100%)",
        }}
      />

      {/* Film grain, matching the vintage-photograph feel of the hero image. */}
      <svg
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 size-full opacity-[0.1] mix-blend-soft-light"
        preserveAspectRatio="none"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </>
  );
}

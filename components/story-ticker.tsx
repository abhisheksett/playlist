// A calm, self-looping crawl of the site's full story text, pinned to the
// left edge of the screen. Rendered twice back-to-back and animated by
// exactly one copy's height so the loop point is seamless. Hidden on small
// screens — there isn't room for a side column next to the centered title
// and player without crowding them.
const PARAGRAPHS = [
  "Imagine you and your close friends meeting after a long while, over Old Monk. It's drizzling outside, cozy inside the room. Someone's cracked open the bottle, someone's still figuring out the mixer-to-rum ratio, and nobody's in a hurry to go anywhere.",
  "The conversation drifts the way it always does — who's doing what now, who still owes whom money from a trip nobody quite remembers properly, the usual roasting that never gets old. Somewhere between the second peg and the third, someone reaches for the aux, and it has to be those songs. Not the new ones. The ones that were playing in the background of every hostel room, every terrace, every long train ride back then.",
  "The happy ones. The heartbreak ones. Back to back, no skipping, no arguing about what's next — because you already know every line, and so does everyone else in the room.",
  "That's this playlist. Old is gold, on repeat, for exactly this kind of night.",
  "Pour one, and hit play.",
];

export function StoryTicker() {
  return (
    <div
      aria-hidden
      className="story-ticker-mask pointer-events-none fixed left-4 top-1/2 z-10 hidden h-80 w-64 -translate-y-1/2 overflow-hidden sm:block sm:left-8 sm:h-112 sm:w-80 lg:left-12 lg:w-96"
    >
      <div className="story-ticker-track flex flex-col gap-8">
        {[...PARAGRAPHS, ...PARAGRAPHS].map((paragraph, index) => (
          <p
            key={index}
            className="font-display text-sm leading-relaxed text-foreground/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

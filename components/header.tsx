"use client";

import { useEffect, useRef, useState } from "react";
import { BookIcon, CheersIcon, CloseIcon, LinkedInIcon, RainIcon } from "@/components/icons";

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    update();
    const id = setInterval(update, 1000 * 15);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-sm font-medium tabular-nums text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
      {time ?? "--:--"}
    </span>
  );
}

// Purely atmospheric — a real synced listener count needs a small realtime
// backend (see the plan notes); this just keeps the "shared room" feel.
function SippingCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const jitter = () => setCount(12 + Math.floor(Math.random() * 24));
    jitter();
    const id = setInterval(jitter, 1000 * 25);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4 text-sm font-medium text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
      aria-live="polite"
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-ember shadow-[0_0_8px_rgba(232,153,74,0.9)]" />
      </span>
      <span className="tabular-nums">{count ?? "—"}</span>
      <span className="text-white/60">sipping tonight</span>
    </div>
  );
}

// Rain + wind beds loop continuously while on, low in the mix so they sit
// under the music rather than compete with it. Every so often a "storm"
// moment fires: wind swells louder for a few seconds and a thunder clap
// plays over it, then wind settles back down — scheduled recursively with
// randomized delays so it feels organic rather than metronomic. Entirely
// separate from the YouTube player — this never touches playback.
const RAIN_VOLUME = 0.14;
const WIND_BASE_VOLUME = 0.1;
const WIND_GUST_VOLUME = 0.4;
const THUNDER_SOUNDS = [
  "/sounds/thunder.mp3",
  "/sounds/thunder2.mp3",
  "/sounds/thunder3.mp3",
  "/sounds/thunder4.mp3",
];

function AmbientButton() {
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const windRef = useRef<HTMLAudioElement | null>(null);
  const thunderRef = useRef<HTMLAudioElement | null>(null);
  const stormTimerRef = useRef<number | null>(null);
  const gustEndTimerRef = useRef<number | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    return () => {
      if (stormTimerRef.current !== null) window.clearTimeout(stormTimerRef.current);
      if (gustEndTimerRef.current !== null) window.clearTimeout(gustEndTimerRef.current);
      rainRef.current?.pause();
      windRef.current?.pause();
    };
  }, []);

  function scheduleStorm(first = false) {
    const delay = first ? 4_000 + Math.random() * 4_000 : 10_000 + Math.random() * 20_000;
    stormTimerRef.current = window.setTimeout(() => {
      const src = THUNDER_SOUNDS[Math.floor(Math.random() * THUNDER_SOUNDS.length)];
      if (!thunderRef.current) thunderRef.current = new Audio();
      const thunder = thunderRef.current;
      thunder.src = src;
      thunder.currentTime = 0;
      thunder.volume = 0.65 + Math.random() * 0.25;
      void thunder.play();

      if (windRef.current) windRef.current.volume = WIND_GUST_VOLUME;
      gustEndTimerRef.current = window.setTimeout(() => {
        if (windRef.current) windRef.current.volume = WIND_BASE_VOLUME;
      }, 5_000 + Math.random() * 3_000);

      scheduleStorm();
    }, delay);
  }

  function toggle() {
    if (!rainRef.current) rainRef.current = new Audio("/sounds/rain.mp3");
    if (!windRef.current) windRef.current = new Audio("/sounds/wind.mp3");
    const rain = rainRef.current;
    const wind = windRef.current;

    if (on) {
      rain.pause();
      wind.pause();
      if (stormTimerRef.current !== null) window.clearTimeout(stormTimerRef.current);
      if (gustEndTimerRef.current !== null) window.clearTimeout(gustEndTimerRef.current);
      setOn(false);
    } else {
      rain.loop = true;
      rain.volume = RAIN_VOLUME;
      void rain.play();

      wind.loop = true;
      wind.volume = WIND_BASE_VOLUME;
      void wind.play();

      scheduleStorm(true);
      setOn(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label="Toggle rain ambience"
      title="Rain ambience"
      className={`pointer-events-auto inline-flex items-center justify-center rounded-full border p-2.5 shadow-lg backdrop-blur-xl transition ${
        on
          ? "border-ember/40 bg-ember/20 text-ember shadow-[0_0_16px_rgba(232,153,74,0.35)]"
          : "border-white/10 bg-black/30 text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      <RainIcon />
    </button>
  );
}

function CheersButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [bump, setBump] = useState(false);

  function playCheers() {
    if (!audioRef.current) audioRef.current = new Audio("/sounds/cheers.mp3");
    const audio = audioRef.current;
    audio.currentTime = 0;
    void audio.play();

    setBump(true);
    window.setTimeout(() => setBump(false), 220);
  }

  return (
    <button
      onClick={playCheers}
      aria-label="Cheers!"
      title="Cheers!"
      className={`pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-black/30 p-2.5 text-white/80 shadow-lg backdrop-blur-xl transition hover:bg-white/10 hover:text-white active:scale-95 ${
        bump ? "scale-125 text-ember" : "scale-100"
      }`}
    >
      <CheersIcon />
    </button>
  );
}

function StoryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Read the story behind this playlist"
      title="The story"
      className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-black/30 p-2.5 text-white/80 shadow-lg backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
    >
      <BookIcon />
    </button>
  );
}

function StoryOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[80dvh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-sm italic text-white/80">The story</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="space-y-4 text-left">
          <p className="font-display text-base italic leading-relaxed text-white/80">
            Imagine you and your close friends meeting after a long while, over Old Monk.
            It&apos;s drizzling outside, cozy inside the room. Someone&apos;s cracked open the
            bottle, someone&apos;s still figuring out the mixer-to-rum ratio, and nobody&apos;s in
            a hurry to go anywhere.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            The conversation drifts the way it always does — who&apos;s doing what now, who still
            owes whom money from a trip nobody quite remembers properly, the usual roasting that
            never gets old. Somewhere between the second peg and the third, someone reaches for
            the aux, and it has to be <em>those</em> songs. Not the new ones. The ones that were
            playing in the background of every hostel room, every terrace, every long train ride
            back then.
          </p>
          <p className="text-sm leading-relaxed text-white/60">
            The happy ones. The heartbreak ones. Back to back, no skipping, no arguing about
            what&apos;s next — because you already know every line, and so does everyone else in
            the room.
          </p>
          <p className="font-display text-base italic text-ember">
            That&apos;s this playlist. Old is gold, on repeat, for exactly this kind of night.
          </p>
          <p className="text-sm text-white/50">Pour one, and hit play.</p>
        </div>
      </div>
    </div>
  );
}

function LinkedInButton() {
  return (
    <a
      href="https://www.linkedin.com/in/abhisheksett"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect on LinkedIn"
      title="Connect on LinkedIn"
      className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-black/30 p-2.5 text-white/80 opacity-0 shadow-lg backdrop-blur-xl transition hover:bg-white/10 hover:text-white hover:opacity-100 focus-visible:opacity-100"
    >
      <LinkedInIcon />
    </a>
  );
}

export function Header() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-20">
      <div className="fixed left-5 top-5 sm:left-8 sm:top-7">
        <Clock />
      </div>
      <div className="fixed left-1/2 top-5 -translate-x-1/2 sm:top-7">
        <SippingCount />
      </div>
      <div className="fixed right-5 top-5 flex items-center gap-2 sm:right-8 sm:top-7">
        <AmbientButton />
        <CheersButton />
      </div>
      <div className="fixed bottom-44 right-5 flex flex-col items-center gap-2 sm:bottom-7 sm:right-8">
        <StoryButton onClick={() => setStoryOpen(true)} />
        <LinkedInButton />
      </div>
      {storyOpen && <StoryOverlay onClose={() => setStoryOpen(false)} />}
    </div>
  );
}

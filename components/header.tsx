"use client";

import { useEffect, useRef, useState } from "react";
import { CheersIcon } from "@/components/icons";

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

export function Header() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-20">
      <div className="fixed left-5 top-5 sm:left-8 sm:top-7">
        <Clock />
      </div>
      <div className="fixed left-1/2 top-5 -translate-x-1/2 sm:top-7">
        <SippingCount />
      </div>
      <div className="fixed right-5 top-5 sm:right-8 sm:top-7">
        <CheersButton />
      </div>
    </div>
  );
}

"use client";

import { useState, type MouseEvent } from "react";
import { usePlaylistPlayer } from "@/hooks/use-playlist-player";
import { tracks } from "@/config/tracks";
import { Queue } from "@/components/queue";
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  QueueIcon,
  ShuffleIcon,
} from "@/components/icons";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Player() {
  const {
    containerRef,
    ready,
    playing,
    shuffle,
    track,
    trackIndex,
    progress,
    toggle,
    next,
    prev,
    selectTrack,
    toggleShuffle,
    seekToFraction,
  } = usePlaylistPlayer(tracks);
  const [queueOpen, setQueueOpen] = useState(false);

  const cover = track.cover ?? `https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`;
  const fraction = progress.duration ? progress.current / progress.duration : 0;

  function handleScrub(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const value = (event.clientX - rect.left) / rect.width;
    seekToFraction(Math.min(1, Math.max(0, value)));
  }

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-end px-4 pb-0 sm:px-8 sm:pb-0">
      {/* Mount point for the hidden YouTube player — audio only, no visible chrome. */}
      <div ref={containerRef} className="pointer-events-none absolute -z-10 size-px opacity-0" />

      {queueOpen && (
        <Queue
          tracks={tracks}
          currentIndex={trackIndex}
          onSelect={(index) => {
            selectTrack(index);
            setQueueOpen(false);
          }}
          onClose={() => setQueueOpen(false)}
        />
      )}

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt=""
            className="size-14 shrink-0 rounded-xl object-cover shadow-lg sm:size-16"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg italic text-white sm:text-xl">
              {track.title}
            </p>
            <p className="truncate text-sm text-white/60">
              {track.artist}
              {track.album ? ` · ${track.album}` : ""}
            </p>
          </div>
          <button
            onClick={() => setQueueOpen((open) => !open)}
            aria-label="Toggle queue"
            aria-expanded={queueOpen}
            className="shrink-0 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <QueueIcon />
          </button>
        </div>

        <div className="mt-3">
          <div
            onClick={handleScrub}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(fraction * 100)}
            tabIndex={0}
            className="h-1.5 w-full cursor-pointer rounded-full bg-white/15"
          >
            <div
              className="h-full rounded-full bg-ember"
              style={{ width: `${fraction * 100}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs tabular-nums text-white/40">
            <span>{formatTime(progress.current)}</span>
            <span>{formatTime(progress.duration)}</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-6">
          <button
            onClick={toggleShuffle}
            aria-pressed={shuffle}
            aria-label="Shuffle"
            className={`transition ${shuffle ? "text-ember" : "text-white/50 hover:text-white"}`}
          >
            <ShuffleIcon />
          </button>
          <button onClick={prev} aria-label="Previous track" className="text-white/80 transition hover:text-white">
            <PrevIcon />
          </button>
          <button
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause" : "Play"}
            className="flex size-12 items-center justify-center rounded-full bg-ember text-rum shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button onClick={next} aria-label="Next track" className="text-white/80 transition hover:text-white">
            <NextIcon />
          </button>
          <span className="size-[18px]" aria-hidden />
        </div>
      </div>
    </div>
  );
}

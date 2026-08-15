"use client";

import type { Track } from "@/config/tracks";
import { CloseIcon } from "@/components/icons";

export function Queue({
  tracks,
  currentIndex,
  onSelect,
  onClose,
}: {
  tracks: Track[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="mb-3 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <p className="font-display text-sm italic text-white/80">Tonight&apos;s pour</p>
        <button
          onClick={onClose}
          aria-label="Close queue"
          className="rounded-full p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <CloseIcon />
        </button>
      </div>
      <ul className="max-h-64 overflow-y-auto py-1">
        {tracks.map((track, index) => (
          <li key={track.youtubeId}>
            <button
              onClick={() => onSelect(index)}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-white/5 ${
                index === currentIndex ? "bg-white/10" : ""
              }`}
            >
              <span
                className={`w-4 shrink-0 text-xs tabular-nums ${
                  index === currentIndex ? "text-ember" : "text-white/30"
                }`}
              >
                {index === currentIndex ? "▸" : index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-sm ${index === currentIndex ? "text-white" : "text-white/80"}`}>
                  {track.title}
                </span>
                <span className="block truncate text-xs text-white/40">{track.artist}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

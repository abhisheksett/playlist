"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadYouTubeIframeAPI } from "@/lib/youtube-api";
import type { Track } from "@/config/tracks";

const PLAYER_VARS: YT.PlayerVars = {
  controls: 0,
  disablekb: 1,
  playsinline: 1,
  rel: 0,
  modestbranding: 1,
};

// Picks a track index that hasn't played yet this "cycle" (session-tracked via
// `playedSet`, mutated in place). Once every track has come up, the cycle
// resets so shuffling keeps going instead of running dry — but the track that
// was just playing is excluded from that reset draw so it never repeats back
// to back.
function pickNextIndex(playedSet: Set<number>, total: number, avoid: number) {
  let candidates = Array.from({ length: total }, (_, i) => i).filter((i) => !playedSet.has(i));
  if (candidates.length === 0) {
    playedSet.clear();
    candidates = Array.from({ length: total }, (_, i) => i).filter((i) => i !== avoid);
    if (candidates.length === 0) candidates = [avoid];
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function usePlaylistPlayer(tracks: Track[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(true);
  // Never open on track 1 — pick a random starting point once per page load.
  const [initialIndex] = useState(() => Math.floor(Math.random() * tracks.length));
  // `order` is the session's playback history: it starts with just the
  // opening track and grows one entry at a time as playback advances, rather
  // than being a fixed precomputed permutation. `playedThisCycle` tracks
  // which tracks have come up since the last reset, so random picks avoid
  // repeats until the whole list has been through.
  const [order, setOrder] = useState<number[]>(() => [initialIndex]);
  const [playedThisCycle, setPlayedThisCycle] = useState<Set<number>>(() => new Set([initialIndex]));
  const [position, setPosition] = useState(0);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });

  const trackIndex = order[position];
  const track = tracks[trackIndex];

  // The player's event handlers are bound once at mount, so they'd otherwise
  // close over stale `order`/`position` forever. Route ENDED through a ref
  // that's kept pointed at the latest `advance` on every render instead.
  const advanceRef = useRef<(delta: 1 | -1) => void>(() => {});

  // Set up the hidden player once on mount.
  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeAPI().then((YTNamespace) => {
      if (cancelled || !containerRef.current || playerRef.current) return;

      playerRef.current = new YTNamespace.Player(containerRef.current, {
        videoId: tracks[initialIndex].youtubeId,
        playerVars: PLAYER_VARS,
        events: {
          onReady: () => setReady(true),
          onStateChange: (event) => {
            const state = window.YT.PlayerState;
            if (event.data === state.PLAYING) setPlaying(true);
            else if (event.data === state.PAUSED) setPlaying(false);
            else if (event.data === state.ENDED) advanceRef.current(1);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll playback progress while something is actually playing.
  useEffect(() => {
    if (!playing) return;

    pollRef.current = setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      setProgress({
        current: player.getCurrentTime() || 0,
        duration: player.getDuration() || 0,
      });
    }, 400);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [playing]);

  const loadTrack = useCallback(
    (nextPosition: number, autoplay: boolean, explicitOrder?: number[]) => {
      const player = playerRef.current;
      if (!player) return;
      const activeOrder = explicitOrder ?? order;
      const nextTrack = tracks[activeOrder[nextPosition]];
      setPosition(nextPosition);
      setProgress({ current: 0, duration: 0 });
      if (autoplay) player.loadVideoById(nextTrack.youtubeId);
      else player.cueVideoById(nextTrack.youtubeId);
    },
    [order, tracks],
  );

  const advance = useCallback(
    (delta: 1 | -1) => {
      if (!shuffle) {
        const total = order.length;
        const nextPosition = ((position + delta) % total + total) % total;
        loadTrack(nextPosition, true);
        return;
      }

      if (delta === -1) {
        if (position === 0) return;
        loadTrack(position - 1, true);
        return;
      }

      if (position + 1 < order.length) {
        loadTrack(position + 1, true);
        return;
      }

      const playedSet = new Set(playedThisCycle);
      const nextIndex = pickNextIndex(playedSet, tracks.length, order[position]);
      playedSet.add(nextIndex);
      setPlayedThisCycle(playedSet);
      const nextOrder = [...order, nextIndex];
      setOrder(nextOrder);
      loadTrack(nextOrder.length - 1, true, nextOrder);
    },
    [shuffle, order, position, playedThisCycle, tracks.length, loadTrack],
  );

  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  const next = useCallback(() => advance(1), [advance]);

  const prev = useCallback(() => {
    const player = playerRef.current;
    if (player && player.getCurrentTime() > 3) {
      player.seekTo(0, true);
      return;
    }
    if (shuffle && position === 0) {
      player?.seekTo(0, true);
      return;
    }
    advance(-1);
  }, [advance, shuffle, position]);

  const selectTrack = useCallback(
    (index: number) => {
      if (!shuffle) {
        loadTrack(index, true);
        return;
      }
      const playedSet = new Set(playedThisCycle);
      playedSet.add(index);
      setPlayedThisCycle(playedSet);
      const nextOrder = [...order, index];
      setOrder(nextOrder);
      loadTrack(nextOrder.length - 1, true, nextOrder);
    },
    [shuffle, order, playedThisCycle, loadTrack],
  );

  const toggleShuffle = useCallback(() => {
    setShuffle((current) => {
      const enabling = !current;
      if (enabling) {
        setOrder([trackIndex]);
        setPlayedThisCycle(new Set([trackIndex]));
        setPosition(0);
      } else {
        setOrder(tracks.map((_, i) => i));
        setPosition(trackIndex);
      }
      return enabling;
    });
  }, [tracks, trackIndex]);

  const seekToFraction = useCallback((fraction: number) => {
    const player = playerRef.current;
    if (!player?.getDuration) return;
    const duration = player.getDuration();
    if (!duration) return;
    player.seekTo(duration * fraction, true);
    setProgress((p) => ({ ...p, current: duration * fraction }));
  }, []);

  return {
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
  };
}

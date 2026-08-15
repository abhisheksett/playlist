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

function shuffledOrder(length: number, keepFirst: number) {
  const rest = Array.from({ length }, (_, i) => i).filter((i) => i !== keepFirst);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [keepFirst, ...rest];
}

export function usePlaylistPlayer(tracks: Track[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [order, setOrder] = useState(() => tracks.map((_, i) => i));
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
        videoId: tracks[0].youtubeId,
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
    (nextPosition: number, autoplay: boolean) => {
      const player = playerRef.current;
      if (!player) return;
      const nextTrack = tracks[order[nextPosition]];
      setPosition(nextPosition);
      setProgress({ current: 0, duration: 0 });
      if (autoplay) player.loadVideoById(nextTrack.youtubeId);
      else player.cueVideoById(nextTrack.youtubeId);
    },
    [order, tracks],
  );

  const advance = useCallback(
    (delta: 1 | -1) => {
      const total = order.length;
      const nextPosition = ((position + delta) % total + total) % total;
      loadTrack(nextPosition, true);
    },
    [order, position, loadTrack],
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
    advance(-1);
  }, [advance]);

  const selectTrack = useCallback(
    (index: number) => {
      const posInOrder = order.indexOf(index);
      loadTrack(posInOrder === -1 ? 0 : posInOrder, true);
    },
    [order, loadTrack],
  );

  const toggleShuffle = useCallback(() => {
    setShuffle((current) => {
      const enabling = !current;
      setOrder(enabling ? shuffledOrder(tracks.length, trackIndex) : tracks.map((_, i) => i));
      setPosition(0);
      return enabling;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks.length, trackIndex]);

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

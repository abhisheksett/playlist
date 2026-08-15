"use client";

import { useEffect, useRef } from "react";

// Keeps the screen awake while `active` is true, so mobile browsers don't
// lock the screen and suspend the hidden YouTube player mid-song. The lock
// is released automatically by the browser whenever the tab is backgrounded,
// so it's re-acquired on `visibilitychange` if playback is still active.
export function useWakeLock(active: boolean) {
  const sentinelRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!active || !("wakeLock" in navigator)) return;

    let cancelled = false;

    async function acquire() {
      try {
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          sentinel.release();
          return;
        }
        sentinelRef.current = sentinel;
      } catch {
        // Wake lock can be refused (e.g. low battery, permissions policy) —
        // playback still works, it just won't keep the screen awake.
      }
    }

    void acquire();

    function onVisibilityChange() {
      if (document.visibilityState === "visible") void acquire();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sentinelRef.current?.release();
      sentinelRef.current = null;
    };
  }, [active]);
}

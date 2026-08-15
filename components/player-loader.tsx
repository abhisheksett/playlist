"use client";

import dynamic from "next/dynamic";

// The player picks a random starting track on the client, so it can never
// render the same markup the server would guess — keep it client-only rather
// than fight a guaranteed hydration mismatch. `ssr: false` requires a Client
// Component boundary, hence this thin wrapper around the dynamic import.
export const Player = dynamic(() => import("@/components/player").then((mod) => mod.Player), {
  ssr: false,
});

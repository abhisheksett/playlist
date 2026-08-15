import { Background } from "@/components/background";
import { Header } from "@/components/header";
import { Player } from "@/components/player";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <Background />
      <Header />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-4xl italic text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] sm:text-6xl">
          Old Monk
        </p>
      </div>

      <Player />
    </main>
  );
}

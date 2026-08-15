import { Background } from "@/components/background";
import { Header } from "@/components/header";
import { Player } from "@/components/player-loader";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <Background />
      <Header />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="h-px w-20 bg-linear-to-r from-transparent via-ember/80 to-transparent sm:w-28" />
        <p className="font-display text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-b from-[#f6d888] via-ember to-[#a8611f] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-6xl">
          Old Monk
        </p>
        <div className="h-px w-20 bg-linear-to-r from-transparent via-ember/80 to-transparent sm:w-28" />
      </div>

      <Player />
    </main>
  );
}

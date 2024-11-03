"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Image from "next/image";
import { useState } from "react";

const queryClient = new QueryClient();

export default function Home() {
  const verifyGameAndRedirect = () => {};
  const [gameId, setGameId] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/dollar.jpg"
            alt="Money"
            width={800}
            height={38}
            priority
          />
          <h1 className="hb-4 text-4xl font-extrabold leading-none tracking-tight text-center">
            Katey's Divide-the-Money Game
          </h1>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md flex-1"
              placeholder="Game ID"
              onChange={(e) => setGameId(e.target.value?.toUpperCase())}
              value={gameId}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={verifyGameAndRedirect}
            >
              Submit
            </button>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <div>&copy; Katey Watson 2024</div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

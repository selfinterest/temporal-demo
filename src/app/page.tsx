"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  async function fetchGame() {
    const response = await fetch(`/api/game/${gameId}`);
    const data = await response.json();
    return data;
  }

  const { push } = useRouter();

  const mutation = useMutation({
    mutationFn: fetchGame,
    onSuccess: async (data) => {
      // Handle the data on success
      if (data.ok) {
        Cookies.set("gameId", data.id);
        Cookies.set("gameExpiration", data.expiration);
        // set localStorage and do redirect
        //localStorage.setItem("gameId", data.id);
        //localStorage.setItem("gameExpiration", data.expiration);
        push(`/game/${data.id}`);
      } else {
        setGameError("Game not found");
      }
    },
    onError: (error) => {
      // Handle any errors
      console.error("Error fetching data:", error);
    },
  });

  /*useEffect(() => {
    const gameId = localStorage.getItem("gameId");
    const expiration = Number(localStorage.getItem("gameExpiration"));
    const now = Date.now();
    if (expiration < now && gameId) {
      push(`/game/${gameId}`);
    }
  });*/

  const verifyGameAndRedirect = () => {
    mutation.mutate();
  };

  const [gameId, setGameId] = useState("");
  const [gameError, setGameError] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image src="/dollar.jpg" alt="Money" width={800} height={38} priority />
        <h1 className="hb-4 text-4xl font-extrabold leading-none tracking-tight text-center">
          Katey&apos;s Divide-the-Money Game
        </h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md flex-1"
            placeholder="Game ID"
            onChange={(e) => {
              setGameError("");
              setGameId(e.target.value?.toUpperCase());
            }}
            value={gameId}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={verifyGameAndRedirect}
          >
            Submit
          </button>
        </div>
        {gameError ? <div>{gameError}</div> : <div></div>}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>&copy; Katey Watson 2024</div>
      </footer>
    </div>
  );
}

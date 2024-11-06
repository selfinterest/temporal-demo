// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function middleware(request: NextRequest) {
  console.log("Using middleware");
  const cookieStore = await cookies();
  const gameId = cookieStore.get("gameId");
  const gameExpiration = cookieStore.get("gameExpiration");
  //const gameId = request.cookies.get("gameId");
  //const gameExpiration = request.cookies.get("gameExpiration");

  const now = Date.now();
  console.log(now);
  console.log(now < Number(gameExpiration?.value));
  // If gameId cookie is present, redirect to /game
  if (
    gameId &&
    gameId.value &&
    gameExpiration &&
    now < Number(gameExpiration?.value)
  ) {
    return NextResponse.redirect(new URL(`/game/${gameId.value}`, request.url));
  } else {
    console.log("Game id not found. Not redirecting");
  }

  // Continue to the game selection screen if no gameId cookie
  return NextResponse.next();
}

// Only apply this middleware to the root URL ("/")
export const config = {
  matcher: "/",
};

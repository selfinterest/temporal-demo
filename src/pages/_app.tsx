import { QueryClient } from "@tanstack/react-query";
import "../app/globals.css";

import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function TemporalDemo({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

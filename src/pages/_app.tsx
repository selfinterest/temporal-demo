import "../app/globals.css";

import type { AppProps } from "next/app";

import ReactQueryProvider from "@/utils/providers/react-query-provider";

export default function TemporalDemo({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}

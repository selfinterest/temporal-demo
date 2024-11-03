import type { AppProps } from "next/app";

export default function TemporalDemo({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

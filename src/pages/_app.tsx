import type { AppProps } from "next/app";
import "../styles/globals.css";
import "primereact/resources/themes/fluent-light/theme.css";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  HandshakeProvider,
  useReplit,
  useThemeValues,
} from "@replit/extensions-react";
import Head from "next/head";

function MainLayout({ Component, pageProps }: AppProps) {
  const themeValues = useThemeValues();

  const mappedThemeValues = themeValues
    ? Object.entries(themeValues).map(
        ([key, val]) =>
          `--${key.replace(
            /[A-Z]/g,
            (c) => "-" + c.toLowerCase()
          )}: ${val} !important;`
      )
    : [];

  return (
    <>
      <Head>
        <style>{`:root, .replit-ui-theme-root {
${mappedThemeValues.join("\n")}
        }`}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

function MyApp(props: AppProps) {
  return (
    <HandshakeProvider>
      <MainLayout {...props} />
    </HandshakeProvider>
  );
}

export default MyApp;

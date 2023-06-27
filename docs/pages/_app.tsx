import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HandshakeProvider } from '@replit/extensions-react';

function MainLayout({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
  </>;
}

function MyApp(props: AppProps) {
  return <HandshakeProvider>
    <MainLayout {...props}/>
  </HandshakeProvider>;
}

export default MyApp;

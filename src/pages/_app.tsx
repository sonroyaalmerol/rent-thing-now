import type { AppProps } from 'next/app';
import trpc from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import '@/styles/tailwind.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <Header />
    <div className="h-40" />
    <main>
      <NextNProgress />
      <Component {...pageProps} />
    </main>
    <Footer />
  </SessionProvider>
);

export default trpc.withTRPC(MyApp);

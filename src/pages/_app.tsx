import type { AppProps } from 'next/app';
import trpc from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';

import '@/styles/tailwind.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <div className="h-24" />
      {router.pathname !== '/things/[slug]' && <div className="h-20" />}
      <main>
        <NextNProgress />
        <Component {...pageProps} />
      </main>
      <Footer />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

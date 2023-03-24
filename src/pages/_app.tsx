import type { AppProps } from 'next/app';
import trpc from '@/utils/trpc';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';
import { Toaster, resolveValue } from 'react-hot-toast';

import '@/styles/tailwind.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toast } from 'flowbite-react';
import clsx from 'clsx';
import { HiCheck, HiExclamation } from 'react-icons/hi';
import { pathNamesWithNavbar } from '@/components/Navbar';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <div className="h-24" />
      {pathNamesWithNavbar.includes(router.pathname) && <div className="h-20" />}
      <main>
        <NextNProgress />
        <Component {...pageProps} />
        <Toaster position="bottom-center">
          {(t) => (
            <Toast
              className={
                clsx([
                  t.visible ? 'opacity-100' : 'opacity-0',
                ])
              }
            >
              { t.type === 'success' && (
                <div className="inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-lg shrink-0 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="w-5 h-5" />
                </div>
              ) }
              { t.type === 'error' && (
                <div className="inline-flex items-center justify-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg shrink-0 dark:bg-orange-700 dark:text-orange-200">
                  <HiExclamation className="w-5 h-5" />
                </div>
              ) }
              <div className="ml-3 text-sm font-normal">
                {resolveValue(t.message, t)}
              </div>
              <Toast.Toggle />
            </Toast>
          )}
        </Toaster>
      </main>
      <Footer />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

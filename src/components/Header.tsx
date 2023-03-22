import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import Navbar from '@/components/Navbar';

import { useSession, signIn } from 'next-auth/react';
import AccountButton from './AccountButton';
import MobileSidebar from './MobileSidebar';
import SearchBar from './SearchBar';

const Header = () => {
  const { status } = useSession();

  return (
    <header
      className={
        clsx([
          'fixed',
          'top-0',
          'left-0',
          'w-full',
          'z-50',
        ])
      }
    >
      <div className={
        clsx([
          'py-6',
          'h-24',
          'text-sm',
          'bg-white',
          'border-b',
          'border-gray-100',
          'z-40',
        ])
      }
      >
        {/* Airbnb-style navbar */}
        <div className="max-w-5xl px-4 mx-auto lg:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <MobileSidebar />
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800"
              >
                RentThingNow
              </Link>
            </div>
            {/* Airbnb-style search bar */}
            <SearchBar />
            <div className="flex items-center">
              { status === 'authenticated' ? (
                <AccountButton />
              ) : (
                <button
                  type="button"
                  className="mr-4 text-gray-600 hover:underline"
                  onClick={() => signIn('google')}
                >
                  Login with Google
                </button>
              ) }
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </header>
  );
};

export default Header;

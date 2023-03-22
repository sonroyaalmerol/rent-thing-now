import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import Navbar from '@/components/Navbar';

import { useRouter } from 'next/router';

import { useSession, signIn } from 'next-auth/react';
import AccountButton from './AccountButton';

const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <header
      className={
        clsx([
          'fixed',
          'top-0',
          'left-0',
          'w-full',
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
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800"
              >
                RentThingNow
              </Link>
            </div>
            {/* Airbnb-style search bar */}
            <div className="relative w-full max-w-xl mr-6 lg:max-w-xs">
              <form onSubmit={handleSearch}>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={
                    clsx([
                      'w-full',
                      'py-2',
                      'pl-4',
                      'pr-4',
                      'text-sm',
                      'text-gray-700',
                      'placeholder:text-gray-500',
                      'bg-white',
                      'border',
                      'border-gray-300',
                      'rounded-3xl',
                      'focus:outline-none',
                      'focus:border-blue-500',
                      'focus:shadow',
                    ])
                  }
                  type="text"
                  placeholder="Find your thing..."
                />
              </form>
            </div>
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

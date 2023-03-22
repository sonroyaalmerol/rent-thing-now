import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

const Footer = () => (
  <footer className="py-10 text-sm bg-gray-100 border-t border-gray-300">
    <div className="max-w-5xl px-4 pb-8 mx-auto mb-6 border-b border-gray-300 lg:px-0">
      <div className="flex flex-wrap items-start justify-start">
        <div className="w-full mb-6 lg:w-1/4 lg:mb-0">
          <h5 className="mb-2 font-semibold text-gray-700">RentThingNow</h5>
          <ul className="leading-loose">
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/careers"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Policies
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Diversity & Belonging
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full mb-6 lg:w-1/4 lg:mb-0">
          <h5 className="mb-2 font-semibold text-gray-700">Discover</h5>
          <ul className="leading-loose">
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Trust &amp; Safety
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Travel Credit
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Gift Cards
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                RentThingNow Citizen
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Business Travel
              </Link>
            </li>
            <li className="flex">
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Things To Do
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Magazine
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full mb-6 lg:w-1/4 lg:mb-0">
          <h5 className="mb-2 font-semibold text-gray-700">Lending</h5>
          <ul className="leading-loose">
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Why Lend
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Hospitality
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Responsible Lending
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Community Center
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="flex items-baseline justify-start mb-2">
            <Link
              href="/"
              className="mr-2"
            />

            <Link
              href="/"
              className="mr-2"
            />

            <Link href="/" />
          </div>

          <ul className="leading-relaxed">
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                className={
                  clsx([
                    'font-semibold',
                    'text-gray-600',
                    'hover:underline',
                  ])
                }
                href="/"
              >
                Site Map
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="flex items-center max-w-5xl px-4 mx-auto lg:px-0">
      <p className="pl-2 text-sm text-gray-600">&copy; 2023 RentThingNow, Inc. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;

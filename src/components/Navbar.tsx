import React from 'react';
import clsx from 'clsx';

import { FaBasketballBall, FaCameraRetro, FaFire, FaMusic, FaSnowman, FaTools } from 'react-icons/fa';
import { GiConsoleController } from 'react-icons/gi';
import IconButton from '@/components/IconButton';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <div className={
      clsx([
        'bg-white',
        'w-full',
        'shadow-md'
      ])
    }>
      <div
        className={
          clsx([
            'h-20',
            'w-4/5',
            'mx-auto',
            'flex',
            'items-center',
            'relative'
          ])
        }
      >
        <div className="flex items-center justify-between my-auto">
          <div className="flex items-center gap-12">
            <IconButton
              href="/"
              icon={<FaFire />}
              label="Trending"
              active={router.pathname === '/'}
            />
            <IconButton
              href="/work-tools"
              icon={<FaTools />}
              label="Work Tools"
              active={router.asPath.includes('/work-tools')}
            />
            <IconButton
              href="/photography"
              icon={<FaCameraRetro />}
              label="Photography"
              active={router.asPath.includes('/photography')}
            />
            <IconButton
              href="/gaming"
              icon={<GiConsoleController />}
              label="Gaming"
              active={router.asPath.includes('/gaming')}
            />
            <IconButton
              href="/instruments"
              icon={<FaMusic />}
              label="Instruments"
              active={router.asPath.includes('/instruments')}
            />
            <IconButton
              href="/winter-things"
              icon={<FaSnowman />}
              label="Winter Things"
              active={router.asPath.includes('/winter-things')}
            />
            <IconButton
              href="/sports"
              icon={<FaBasketballBall />}
              label="Sports"
              active={router.asPath.includes('/sports')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Navbar;

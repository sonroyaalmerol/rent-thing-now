import useOnClickOutside from '@/utils/useOnClickOutside';
import clsx from 'clsx';
import { Sidebar } from 'flowbite-react';
import React from 'react';
import Link from 'next/link';

import {
  FaBars, FaBasketballBall, FaCameraRetro, FaFire, FaMusic, FaSnowman, FaTools,
} from 'react-icons/fa';
import { GiConsoleController } from 'react-icons/gi';
import { useRouter } from 'next/router';

const MobileSidebar = () => {
  const ref = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <button
        type="button"
        color="transparent"
        className={
          clsx([
            'p-2',
            'ml-2',
            'text-gray-600',
            'hover:text-gray-800',
            'hover:bg-gray-100',
            'rounded-full',
            'text-lg',
          ])
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
      <div
        className={
          clsx([
            'fixed',
            'top-0',
            'left-0',
            'z-50',
            'h-full',
            'shadow-lg',
            'w-fit',
            'ease-in-out',
            'duration-150',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          ])
        }
        ref={ref}
      >
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link href="/">
                <Sidebar.Item
                  icon={FaFire}
                >
                  Trending
                </Sidebar.Item>
              </Link>

              <Link href="/work-tools">
                <Sidebar.Item
                  icon={FaTools}
                >
                  Work Tools
                </Sidebar.Item>
              </Link>

              <Link href="/photography">
                <Sidebar.Item
                  icon={FaCameraRetro}
                >
                  Photography
                </Sidebar.Item>
              </Link>

              <Link href="/gaming">
                <Sidebar.Item
                  icon={GiConsoleController}
                >
                  Gaming
                </Sidebar.Item>
              </Link>

              <Link href="/instruments">
                <Sidebar.Item
                  icon={FaMusic}
                >
                  Instruments
                </Sidebar.Item>
              </Link>

              <Link href="/winter-things">
                <Sidebar.Item
                  icon={FaSnowman}
                >
                  Winter Things
                </Sidebar.Item>
              </Link>

              <Link href="/sports">
                <Sidebar.Item
                  icon={FaBasketballBall}
                >
                  Sports
                </Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

    </>
  );
};

export default MobileSidebar;

import useOnClickOutside from '@/utils/useOnClickOutside';
import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import {
  FaBars, FaBasketballBall, FaCameraRetro, FaFire, FaMusic, FaSnowman, FaTools,
} from 'react-icons/fa';
import { GiConsoleController } from 'react-icons/gi';
import { useRouter } from 'next/router';

const Sidebar = dynamic(
  () => import('flowbite-react').then((c) => c.Sidebar),
  {
    ssr: false,
  },
);

const SidebarItems = dynamic(
  () => import('flowbite-react').then((c) => c.Sidebar.Items),
  {
    ssr: false,
  },
);

const SidebarItemGroup = dynamic(
  () => import('flowbite-react').then((c) => c.Sidebar.ItemGroup),
  {
    ssr: false,
  },
);

const SidebarItem = dynamic(
  () => import('flowbite-react').then((c) => c.Sidebar.Item),
  {
    ssr: false,
  },
);

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
          <SidebarItems>
            <SidebarItemGroup>
              <Link href="/">
                <SidebarItem
                  icon={FaFire}
                >
                  Trending
                </SidebarItem>
              </Link>

              <Link href="/work-tools">
                <SidebarItem
                  icon={FaTools}
                >
                  Work Tools
                </SidebarItem>
              </Link>

              <Link href="/photography">
                <SidebarItem
                  icon={FaCameraRetro}
                >
                  Photography
                </SidebarItem>
              </Link>

              <Link href="/gaming">
                <SidebarItem
                  icon={GiConsoleController}
                >
                  Gaming
                </SidebarItem>
              </Link>

              <Link href="/instruments">
                <SidebarItem
                  icon={FaMusic}
                >
                  Instruments
                </SidebarItem>
              </Link>

              <Link href="/winter-things">
                <SidebarItem
                  icon={FaSnowman}
                >
                  Winter Things
                </SidebarItem>
              </Link>

              <Link href="/sports">
                <SidebarItem
                  icon={FaBasketballBall}
                >
                  Sports
                </SidebarItem>
              </Link>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>

    </>
  );
};

export default MobileSidebar;

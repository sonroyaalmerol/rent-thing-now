import React from 'react';
import { Dropdown } from 'flowbite-react';

import clsx from 'clsx';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const AccountButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Dropdown
      color="white"
      label={(
        <div className="flex items-center p-0">
          <img
            className={clsx(
              'w-8 h-8 rounded-full',
              'border-2 border-white',
              'mr-2',
            )}
            src={session?.user?.image || ''}
            alt="Profile"
            referrerPolicy="no-referrer"
          />
          <span className="hidden font-semibold md:block">
            {session?.user?.name}
          </span>
        </div>
        )}
      className={clsx([
        'z-50',
      ])}
    >
      <Link href="/profile">
        <Dropdown.Item>
          Profile
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Link href="/my-things">
        <Dropdown.Item>
          My Things
        </Dropdown.Item>
      </Link>
      <Link href="/borrowed">
        <Dropdown.Item>
          Borrowed Things
        </Dropdown.Item>
      </Link>
      <Link href="/saved">
        <Dropdown.Item>
          Saved Things
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Link href="/earnings">
        <Dropdown.Item>
          Earnings
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => signOut()}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default AccountButton;

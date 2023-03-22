import React from 'react';
import { Dropdown } from "flowbite-react";

import clsx from 'clsx';

import prisma from '@/utils/prisma';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const AccountButton: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Dropdown
        color="white"
        label={
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
            <span className="font-semibold">
              {session?.user?.name}
            </span>
          </div>
        }
        className={clsx([
          'z-50'
        ])}
      >
        <Dropdown.Item onClick={() => router.push('/profile')}>
          Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          My Things
        </Dropdown.Item>
        <Dropdown.Item>
          Borrowed Things
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          Earnings
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut()}>
          Sign out
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}

export default AccountButton;
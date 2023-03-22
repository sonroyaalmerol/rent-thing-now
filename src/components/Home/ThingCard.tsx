import { Thing } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa';

import { currencyFormat } from 'simple-currency-format';

interface ThingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thing: Thing & {
    owner: {
        name: string | null;
        image: string | null;
        email: string | null;
    };
    images: {
        caption: string;
        url: string;
    }[];
  };
}

const ThingCard: React.FC<ThingCardProps> = ({ thing, ...props }) => (
  <div
    {...props}
    className={
    clsx([
      'inline-block',
      'm-4',
      'mx-auto',
      'w-80',
      'box-border',
    ])
  }
  >
    <div className="flex items-center justify-center mb-4 bg-gray-100 h-80 w-80 rounded-xl">
      <img
        className="object-cover w-full h-full rounded-xl"
        src={thing.images[0]?.url ?? 'https://loremflickr.com/640/640'}
        alt={thing.images[0]?.caption ?? 'Thing Image'}
      />
    </div>
    <Link
      href={`/things/${thing.slug}`}
      className="flex flex-col items-start justify-start w-full"
    >

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{thing.title}</h3>
        </div>
        <div className="flex items-center justify-end">
          <FaStar className="mr-1" />
          {' '}
          4.5
        </div>
      </div>
      <p className="mb-2 text-sm text-gray-600">{thing.description}</p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start">
          <p className="mr-2 text-2xl font-bold text-black">{currencyFormat(thing.rate, 'en-US', 'USD')}</p>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-sm text-gray-600">{thing.owner.name}</p>
          <img
            className="object-cover w-8 h-8 ml-2 rounded-full"
            src={thing.owner.image ?? 'https://loremflickr.com/640/640'}
            alt={thing.owner.name ?? 'User Image'}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </Link>
  </div>
);

export default ThingCard;

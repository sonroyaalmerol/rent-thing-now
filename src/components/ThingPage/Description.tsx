import React from 'react';

import clsx from 'clsx';
import {
  Category, Thing, ThingImage, ThingReview, User,
} from '@prisma/client';
import { HiViewGrid } from 'react-icons/hi';

interface ThingDescriptionProps {
  thing: (Thing & {
    images: ThingImage[];
    reviews: ThingReview[];
    category: Category[];
    owner: User;
  });
}

const ThingDescription: React.FC<ThingDescriptionProps> = ({ thing }) => (
  <>
    <div className={clsx([
      'flex',
      'justify-between',
      'items-center',
    ])}
    >
      <div className={clsx([
        'flex',
        'flex-row',
        'items-center',
        'gap-2',
        'justify-start',
      ])}
      >
        <h2
          className={clsx([
            'text-2xl',
            'font-semibold',
            'text-gray-800',
            'mb-4',
          ])}
        >
          Description
        </h2>
      </div>
      <div className={clsx([
        'flex',
        'flex-row',
        'items-center',
        'gap-4',
        'justify-end',
      ])}
      >
        <button
          type="button"
          className={clsx([
            'bg-white',
            'rounded-lg',
            'p-2',
            'border',
            'border-black',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-offset-2',
            'focus:ring-offset-gray-100',
            'focus:ring-indigo-500',
          ])}
        >
          <div className="flex flex-row items-center gap-2">
            <HiViewGrid />
            View all photos
          </div>
        </button>
      </div>
    </div>

    <div className={clsx([
      'flex',
      'flex-col',
      'w-full',
      'mt-4',
    ])}
    >
      <p className={clsx([
        'text-gray-600',
        'text-sm',
      ])}
      >
        {thing.description}
      </p>
    </div>

    <div className="flex flex-row items-center justify-end mt-2">
      <div className="flex flex-col mr-4 text-right">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {thing.owner.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Thing Owner
        </span>
      </div>
      <img
        className="w-16 h-16 mb-3 rounded-full shadow-lg"
        src={thing.owner.image ?? 'https://i.pravatar.cc/150?img=32'}
        alt={thing.owner.name ?? "Owner's name"}
        referrerPolicy="no-referrer"
      />
    </div>
  </>
);

export default ThingDescription;

import { Thing } from '@prisma/client';
import React from 'react';

import clsx from 'clsx';
import { FaHeart, FaShare, FaStar } from 'react-icons/fa';

interface ThingHeaderProps {
  thing: Thing;
}

const ThingHeader: React.FC<ThingHeaderProps> = ({ thing }) => (
  <div className={clsx([
    'flex',
    'flex-col',
    'w-full',
  ])}
  >
    <h1
      className={clsx([
        'text-3xl',
        'font-semibold',
        'text-gray-800',
        'mb-4',
      ])}
    >
      {thing.title}
    </h1>
    <div className={clsx([
      'flex',
      'justify-between',
      'flex-wrap',
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
        <div className={clsx([
          'flex',
          'flex-row',
          'items-center',
        ])}
        >
          <FaStar className="mr-1" />
          <p>4.5</p>
        </div>
        <p>·</p>
        <a
          href="#reviews_section"
          className="font-semibold underline"
        >
          Reviews
        </a>
        <p>·</p>
        <p>{thing.location}</p>
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
          className="flex flex-row items-center gap-2"
        >
          <FaShare />
          <span className="font-semibold underline">Share</span>
        </button>
        <button
          type="button"
          className="flex flex-row items-center gap-2"
        >
          <FaHeart />
          <span className="font-semibold underline">Save</span>
        </button>
      </div>
    </div>
  </div>
);

export default ThingHeader;

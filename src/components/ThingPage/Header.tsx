import { Thing } from '@prisma/client';
import React from 'react';

import clsx from 'clsx';
import { FaHeart, FaShare, FaStar } from 'react-icons/fa';
import trpc from '@/utils/trpc';

import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface ThingHeaderProps {
  thing: Thing;
}

const ThingHeader: React.FC<ThingHeaderProps> = ({ thing }) => {
  const { data } = trpc.thingTotalReviews.useQuery({ id: thing.id });

  const session = useSession();

  const { data: saved, refetch } = trpc.userSavedThing.useQuery({
    thingId: thing.id,
    userId: session.data?.user?.id ?? '',
  });

  const toggleSave = trpc.userSaveThingToggle.useMutation();

  React.useEffect(() => {
    refetch();
  }, [refetch, toggleSave.isSuccess]);

  const copyUrlToClipboard = async () => {
    if (!navigator.clipboard) {
      toast.error('Clipboard API not supported');
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
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
            {/* eslint-disable-next-line no-underscore-dangle */}
            <p>{data?._avg.rating?.toFixed(1) ?? 0}</p>
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
            onClick={() => {
              copyUrlToClipboard();
              toast.success('Copied to clipboard!');
            }}
          >
            <FaShare />
            <span className="font-semibold underline">Share</span>
          </button>
          { session.data?.user && (
            <button
              type="button"
              className="flex flex-row items-center gap-2"
              onClick={() => {
                toggleSave.mutate({
                  thingId: thing.id,
                  userId: session.data?.user?.id ?? '',
                });
              }}
              disabled={toggleSave.isLoading}
            >
              { saved && <FaHeart className="text-red-500" /> }
              {!saved && <FaHeart />}
              <span className="font-semibold underline">{`${saved ? 'Unsave' : 'Save'}`}</span>
            </button>
          ) }
        </div>
      </div>
    </div>
  );
};

export default ThingHeader;

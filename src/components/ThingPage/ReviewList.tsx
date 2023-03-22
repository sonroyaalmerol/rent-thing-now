import React from 'react';

import clsx from 'clsx';
import trpc from '@/utils/trpc';
import { Thing } from '@prisma/client';

import dayjs from 'dayjs';

interface ReviewListProps extends React.HTMLAttributes<HTMLDivElement> {
  thing: Thing;
}

const ReviewList: React.FC<ReviewListProps> = ({ thing }) => {
  const { data } = trpc.thingReviews.useQuery({ id: thing.id });

  return (
    <div
      className={
        clsx([
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'gap-4',
          'w-full',
        ])
      }
    >
      {data?.map((review) => (
        <div
          key={review.id}
          className={clsx([
            'flex',
            'flex-col',
            'items-center',
            'justify-start',
            'w-full',
            'gap-2',
            'p-4',
            'mb-4',
          ])}
        >
          <div className="flex items-center justify-start w-full">
            <img
              className="object-cover w-10 h-10 mr-4 rounded-full"
              src={review.renter.image ?? 'https://loremflickr.com/640/640'}
              alt={review.renter.name ?? 'Reviewer Image'}
            />
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-lg font-semibold">
                {review.renter.name ?? 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-600">
                {review.reviewDate ? dayjs(review.reviewDate).format('MMMM YYYY') : 'No Date'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start w-full">
            <p className="text-black">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

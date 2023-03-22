import React from 'react';

import { Rating } from 'flowbite-react';
import { Thing } from '@prisma/client';
import trpc from '@/utils/trpc';

interface ReviewSummaryProps {
  thing: Thing;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ thing }) => {
  const { data } = trpc.thingReviews.useQuery({ id: thing.id });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Rating>
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star filled={false} />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          4.95 out of 5
        </p>
      </Rating>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        1,745 global ratings
      </p>
      <Rating.Advanced percentFilled={70}>
        5 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={17}>
        4 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={8}>
        3 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={4}>
        2 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={1}>
        1 star
      </Rating.Advanced>
    </>
  );
};

export default ReviewSummary;

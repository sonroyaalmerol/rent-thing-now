/* eslint-disable no-underscore-dangle */
import React from 'react';

import { Rating } from 'flowbite-react';
import { Thing } from '@prisma/client';
import trpc from '@/utils/trpc';

interface ReviewSummaryProps {
  thing: Thing;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ thing }) => {
  const { data } = trpc.thingReviewSummary.useQuery({ id: thing.id });

  const [
    fiveStarReviewsCount,
    fourStarReviewsCount,
    threeStarReviewsCount,
    twoStarReviewsCount,
    oneStarReviewsCount,
    totalReviewsCount,
  ] = React.useMemo(() => {
    const total: number = (
      (data?.fiveStar?._count ?? 0)
      + (data?.fourStar?._count ?? 0)
      + (data?.threeStar?._count ?? 0)
      + (data?.twoStar?._count ?? 0)
      + (data?.oneStar?._count ?? 0)
    );

    return [
      (data?.fiveStar._count ?? 0) / total,
      (data?.fourStar._count ?? 0) / total,
      (data?.threeStar._count ?? 0) / total,
      (data?.twoStar._count ?? 0) / total,
      (data?.oneStar._count ?? 0) / total,
      total,
    ];
  }, [data]);

  const totalRating = React.useMemo(() => data?.allStars._avg.rating ?? 0, [data]);

  const checkIfNaN = (value: number) => (Number.isNaN(value) ? 0 : value);

  return (
    <>
      <Rating>
        <Rating.Star filled={totalRating >= 1} />
        <Rating.Star filled={totalRating >= 2} />
        <Rating.Star filled={totalRating >= 3} />
        <Rating.Star filled={totalRating >= 4} />
        <Rating.Star filled={totalRating >= 5} />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {`${totalRating.toFixed(1)} out of 5.0`}
        </p>
      </Rating>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {`${totalReviewsCount} global ratings`}
      </p>
      <Rating.Advanced
        percentFilled={
          checkIfNaN(fiveStarReviewsCount) * 100
        }
      >
        5 star
      </Rating.Advanced>
      <Rating.Advanced
        percentFilled={
          checkIfNaN(fourStarReviewsCount) * 100
        }
      >
        4 star
      </Rating.Advanced>
      <Rating.Advanced
        percentFilled={
          checkIfNaN(threeStarReviewsCount) * 100
        }
      >
        3 star
      </Rating.Advanced>
      <Rating.Advanced
        percentFilled={
          checkIfNaN(twoStarReviewsCount) * 100
        }
      >
        2 star
      </Rating.Advanced>
      <Rating.Advanced
        percentFilled={
          checkIfNaN(oneStarReviewsCount) * 100
        }
      >
        1 star
      </Rating.Advanced>
    </>
  );
};

export default ReviewSummary;

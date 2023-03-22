import { z } from 'zod';
import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

export default procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const [
      allStars,
      oneStar,
      twoStar,
      threeStar,
      fourStar,
      fiveStar,
    ] = await prisma.$transaction([
      prisma.thingReview.aggregate({
        where: {
          thingId: input.id,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      }),
      prisma.thingReview.aggregate({
        where: {
          thingId: input.id,
          rating: 1,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      }),
      prisma.thingReview.aggregate({
        where: {
          thingId: input.id,
          rating: 2,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      }),
      prisma.thingReview.aggregate({
        where: {
          thingId: input.id,
          rating: 3,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      }),
      prisma.thingReview.aggregate({
        where: {
          thingId: input.id,
          rating: 4,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      }),
      prisma.thingReview.aggregate({
        where: {
          thingId: input.id,
          rating: 5,
        },
        _avg: {
          rating: true,
        },
        _count: true,
      }),
    ]);

    return {
      allStars,
      oneStar,
      twoStar,
      threeStar,
      fourStar,
      fiveStar,
    };
  });

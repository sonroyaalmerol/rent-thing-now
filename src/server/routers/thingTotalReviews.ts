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
    const review = await prisma.thingReview.aggregate({
      where: {
        thingId: input.id,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return review;
  });

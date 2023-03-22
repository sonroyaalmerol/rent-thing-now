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
    const reviews = await prisma.thingReview.findMany({
      where: {
        thingId: input.id,
      },
      include: {
        renter: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 4,
    });

    return reviews;
  });

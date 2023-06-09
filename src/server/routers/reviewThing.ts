import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
      rating: z.number().min(1).max(5),
      review: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const newReview = await prisma.thingReview.create({
      data: {
        thingId: input.thingId,
        renterId: ctx.session.user.id ?? '',
        rating: input.rating,
        review: input.review,
      },
    });

    return newReview;
  });

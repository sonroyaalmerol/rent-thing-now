import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      quantity: z.number().optional(),
      message: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const newApplication = await prisma.thingApplication.create({
      data: {
        thingId: input.thingId,
        renterId: ctx.session.user.id ?? '',
        startDate: input.startDate,
        endDate: input.endDate,
        quantity: input.quantity ?? 1,
        message: input.message,
      },
    });

    return newApplication;
  });

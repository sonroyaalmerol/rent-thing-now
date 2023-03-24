import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

import dayjs from 'dayjs';

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
    const thing = await prisma.thing.findUnique({
      where: {
        id: input.thingId,
      },
    });

    const totalDays = dayjs(input.endDate).diff(dayjs(input.startDate), 'day');
    const totalAmount = (thing?.rate ?? 0) * totalDays * (input.quantity ?? 1);

    const newApplication = await prisma.thingApplication.create({
      data: {
        thingId: input.thingId,
        renterId: ctx.session.user.id ?? '',
        startDate: input.startDate,
        endDate: input.endDate,
        quantity: input.quantity ?? 1,
        message: input.message,
        totalPrice: totalAmount,
      },
    });

    return newApplication;
  });

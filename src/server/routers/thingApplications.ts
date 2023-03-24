import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingApplicationStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const thing = await prisma.thing.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!thing) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (thing?.ownerId !== ctx.session.user.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const [
      unprocessed,
      ongoing,
      processed,
      canceled,
    ] = await prisma.$transaction([
      prisma.thingApplication.findMany({
        where: {
          thingId: input.id,
          status: ThingApplicationStatus.PENDING,
        },
        include: {
          renter: true,
        },
        orderBy: {
          updatedDate: 'desc',
        },
      }),
      prisma.thingApplication.findMany({
        where: {
          thingId: input.id,
          status: {
            in: [
              ThingApplicationStatus.WAITING_PAYMENT,
              ThingApplicationStatus.PAID,
              ThingApplicationStatus.WAITING_PICKUP,
              ThingApplicationStatus.PICKED_UP,
              ThingApplicationStatus.WAITING_RETURN,
            ],
          },
        },
        include: {
          renter: true,
        },
        orderBy: {
          updatedDate: 'desc',
        },
      }),
      prisma.thingApplication.findMany({
        where: {
          thingId: input.id,
          status: {
            in: [
              ThingApplicationStatus.RETURNED,
              ThingApplicationStatus.REJECTED,
            ],
          },
        },
        include: {
          renter: true,
        },
        orderBy: {
          updatedDate: 'desc',
        },
      }),
      prisma.thingApplication.findMany({
        where: {
          thingId: input.id,
          status: ThingApplicationStatus.CANCELED,
        },
        include: {
          renter: true,
        },
        orderBy: {
          updatedDate: 'desc',
        },
      }),
    ]);

    return {
      unprocessed,
      ongoing,
      processed,
      canceled,
    };
  });

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
      prisma.thingApplication.count({
        where: {
          thingId: input.id,
          status: ThingApplicationStatus.PENDING,
        },
      }),
      prisma.thingApplication.count({
        where: {
          thingId: input.id,
          status: {
            in: [
              ThingApplicationStatus.PAID,
              ThingApplicationStatus.WAITING_PICKUP,
              ThingApplicationStatus.PICKED_UP,
              ThingApplicationStatus.WAITING_RETURN,
            ],
          },
        },
      }),
      prisma.thingApplication.count({
        where: {
          thingId: input.id,
          status: {
            in: [
              ThingApplicationStatus.RETURNED,
              ThingApplicationStatus.REJECTED,
            ],
          },
        },
      }),
      prisma.thingApplication.count({
        where: {
          thingId: input.id,
          status: ThingApplicationStatus.CANCELED,
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

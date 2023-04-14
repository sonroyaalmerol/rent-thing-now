import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { TRPCError } from '@trpc/server';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const thing = await prisma.thing.findUnique({
      where: {
        id: input.thingId,
      },
    });

    if (!thing) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (thing.ownerId !== ctx.session.user.id) {
      const supportRequests = await prisma.supportRequest.findMany({
        where: {
          thingId: input.thingId,
          renterId: ctx.session.user.id,
        },
        include: {
          renter: true,
          reply: true,
        },
        orderBy: {
          requestDate: 'desc',
        },
      });

      return supportRequests;
    }

    const supportRequests = await prisma.supportRequest.findMany({
      where: {
        thingId: input.thingId,
      },
      include: {
        renter: true,
        reply: true,
      },
      orderBy: {
        requestDate: 'desc',
      },
    });

    return supportRequests;
  });

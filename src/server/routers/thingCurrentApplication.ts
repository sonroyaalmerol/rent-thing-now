import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
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

    const application = await prisma.thingApplication.findFirst({
      where: {
        thingId: input.id,
        renterId: ctx.session.user.id,
      },
      include: {
        renter: {
          include: {
            profile: true,
          },
        },
        thing: true,
      },
      orderBy: {
        updatedDate: 'desc',
      },
    });

    return application;
  });

import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { TRPCError } from '@trpc/server';
import { ThingApplicationStatus } from '@prisma/client';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const thingApplication = await prisma.thingApplication.findUnique({
      where: {
        id: input.id,
      },
      include: {
        thing: true,
      },
    });

    if (!thingApplication) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (thingApplication.thing.ownerId !== ctx.session.user.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    await prisma.thingApplication.update({
      where: {
        id: input.id,
      },
      data: {
        status: ThingApplicationStatus.CANCELED,
      },
    });

    return true;
  });

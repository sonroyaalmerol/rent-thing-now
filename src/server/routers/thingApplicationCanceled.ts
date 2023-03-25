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
    const thingApplication = await prisma.thingApplication.findFirst({
      where: {
        id: input.id,
        renterId: ctx.session.user.id,
      },
      include: {
        thing: true,
      },
    });

    if (!thingApplication) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    await prisma.thingApplication.update({
      where: {
        id: thingApplication.id,
      },
      data: {
        status: ThingApplicationStatus.CANCELED,
      },
    });

    return true;
  });

import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingApplicationStatus } from '@prisma/client';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const rentCount = await prisma.thingApplication.count({
      where: {
        thingId: input.thingId,
        renterId: ctx.session.user.id,
        status: {
          notIn: [
            ThingApplicationStatus.REJECTED,
            ThingApplicationStatus.CANCELED,
            ThingApplicationStatus.RETURNED,
          ],
        },
      },
    });

    return rentCount === 0;
  });

import { z } from 'zod';
import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingApplicationStatus } from '@prisma/client';

export default procedure
  .input(
    z.object({
      thingId: z.string(),
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const rentCount = await prisma.thingApplication.count({
      where: {
        thingId: input.thingId,
        renterId: input.userId,
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

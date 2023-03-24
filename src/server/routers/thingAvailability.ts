import { z } from 'zod';
import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingApplicationStatus } from '@prisma/client';

export default procedure
  .input(
    z.object({
      id: z.string(),
      startDate: z.date(),
      endDate: z.date(),
    }),
  )
  .query(async ({ input }) => {
    const thing = await prisma.thing.findUnique({
      where: {
        id: input.id,
      },
    });

    // check if there are any applications that overlap with the given dates
    const currentlyRentedThings = await prisma.thingApplication.count({
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
        OR: [
          {
            startDate: {
              lte: input.startDate,
            },
            endDate: {
              gte: input.startDate,
              lte: input.endDate,
            },
          },
          {
            startDate: {
              gte: input.startDate,
              lte: input.endDate,
            },
            endDate: {
              gte: input.endDate,
            },
          },
          {
            startDate: {
              lte: input.startDate,
            },
            endDate: {
              gte: input.endDate,
            },
          },
        ],
      },
    });

    return (thing?.quantity ?? 0) - currentlyRentedThings;
  });

import { z } from 'zod';
import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

export default procedure
  .input(
    z.object({
      thingId: z.string(),
      userId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const savedThing = await prisma.favoriteThing.findFirst({
      where: {
        thingId: input.thingId,
        renterId: input.userId,
      },
    });

    if (savedThing) {
      await prisma.favoriteThing.delete({
        where: {
          id: savedThing.id,
        },
      });

      return false;
    }

    await prisma.favoriteThing.create({
      data: {
        thingId: input.thingId,
        renterId: input.userId,
      },
    });

    return true;
  });

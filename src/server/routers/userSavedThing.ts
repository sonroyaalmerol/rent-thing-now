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
  .query(async ({ input }) => {
    const savedThing = await prisma.favoriteThing.findFirst({
      where: {
        thingId: input.thingId,
        renterId: input.userId,
      },
    });

    return !!savedThing;
  });

import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const savedThing = await prisma.favoriteThing.findFirst({
      where: {
        thingId: input.thingId,
        renterId: ctx.session.user.id,
      },
    });

    return !!savedThing;
  });

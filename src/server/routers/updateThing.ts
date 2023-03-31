import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      equipmentType: z.string(),
      rate: z.number(),
      quantity: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const thing = await prisma.thing.findFirst({
      where: {
        id: input.thingId,
        ownerId: ctx.session.user.id,
      },
    });

    if (!thing) throw new TRPCError({ code: 'NOT_FOUND' });

    const updatedThing = await prisma.thing.update({
      where: {
        id: thing.id,
      },
      data: {
        title: input.title,
        description: input.description,
        location: input.location,
        equipmentType: input.equipmentType,
        rate: input.rate,
        quantity: input.quantity,
      },
    });

    return updatedThing;
  });

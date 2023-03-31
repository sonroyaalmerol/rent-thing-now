import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      location: z.string(),
      equipmentType: z.string(),
      rate: z.number(),
      quantity: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const slug = `${input.title.toLowerCase().replace(/ /g, '-')}-${ctx.session.user.id}`;

    const newThing = await prisma.thing.create({
      data: {
        title: input.title,
        description: input.description,
        location: input.location,
        equipmentType: input.equipmentType,
        rate: input.rate,
        quantity: input.quantity,
        slug,
        ownerId: ctx.session.user.id ?? '',
      },
    });

    return newThing;
  });

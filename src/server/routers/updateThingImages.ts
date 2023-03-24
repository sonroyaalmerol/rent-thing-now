import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
      urls: z.array(z.string()),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const thing = await prisma.thing.findFirst({
      where: {
        id: input.thingId,
        ownerId: ctx.session.user.id,
      },
      include: {
        images: true,
      },
    });

    if (!thing) throw new TRPCError({ code: 'NOT_FOUND' });

    await prisma.$transaction(thing.images.map((image) => prisma.thingImage.delete({
      where: {
        id: image.id,
      },
    })));

    await prisma.$transaction(input.urls.map((url, i) => prisma.thingImage.create({
      data: {
        url,
        thingId: thing.id,
        caption: `Image ${i + 1} - ${thing.title}`,
      },
    })));
  });

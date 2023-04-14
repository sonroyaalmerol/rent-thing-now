import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { TRPCError } from '@trpc/server';

export default protectedProcedure
  .input(
    z.object({
      requestId: z.string(),
      reply: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { user } = ctx.session;

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const supportRequest = await prisma.supportRequest.findUnique({
      where: {
        id: input.requestId,
      },
      include: {
        thing: true,
      },
    });

    if (!supportRequest) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (supportRequest.thing.ownerId !== user.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const reply = await prisma.supportReply.create({
      data: {
        reply: input.reply,
        requestId: supportRequest.id,
      },
    });

    return reply;
  });

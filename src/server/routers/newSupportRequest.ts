import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { TRPCError } from '@trpc/server';
import { ThingApplicationStatus } from '@prisma/client';
import sendEmail from '@/utils/sendEmail';

export default protectedProcedure
  .input(
    z.object({
      thingId: z.string(),
      description: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { user } = ctx.session;

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const thing = await prisma.thing.findUnique({
      where: {
        id: input.thingId,
      },
      include: {
        owner: true,
      },
    });

    if (!thing) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    const renter = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!renter) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    const thingApplication = await prisma.thingApplication.findFirst({
      where: {
        thingId: thing.id,
        renterId: renter.id,
        status: {
          notIn: [
            ThingApplicationStatus.CANCELED,
            ThingApplicationStatus.REJECTED,
            ThingApplicationStatus.RETURNED,
          ],
        },
      },
    });

    if (!thingApplication) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    const supportRequest = await prisma.supportRequest.create({
      data: {
        renterId: renter.id,
        thingId: thing.id,
        description: input.description,
      },
    });

    await sendEmail({
      to: thing.owner.email ?? '',
      subject: `New support request from ${renter.name}`,
      html: `
        <p>Hi ${thing.owner.name},</p>
        <p>${renter.name} has requested support for ${thing.title}.</p>
        <p>Message:</p>
        <p>${input.description}</p>
        <p>Thanks,</p>
        <p>Rent My Thing</p>
      `,
    });

    return supportRequest;
  });

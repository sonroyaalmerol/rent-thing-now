import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { TRPCError } from '@trpc/server';
import { ThingApplicationStatus } from '@prisma/client';
import { createSession, getSession } from '@/utils/stripe';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    let thingApplication = await prisma.thingApplication.findFirst({
      where: {
        id: input.id,
        status: ThingApplicationStatus.WAITING_PAYMENT,
        renterId: ctx.session.user.id,
      },
      include: {
        thing: true,
        renter: true,
      },
    });

    if (!thingApplication) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    let stripeSession = await getSession(thingApplication.stripeSessionId ?? '');

    if (stripeSession.status === 'expired') {
      stripeSession = await createSession(thingApplication);
      thingApplication = await prisma.thingApplication.update({
        where: {
          id: thingApplication.id,
        },
        data: {
          stripeSessionId: stripeSession.id,
          stripeSessionUrl: stripeSession.url,
        },
        include: {
          thing: true,
          renter: true,
        },
      });
    }

    if (stripeSession.payment_status !== 'paid') {
      return false;
    }

    if (thingApplication.status !== ThingApplicationStatus.WAITING_PAYMENT) {
      return true;
    }

    await prisma.thingApplication.update({
      where: {
        id: thingApplication.id,
      },
      data: {
        status: ThingApplicationStatus.PAID,
      },
    });

    return true;
  });

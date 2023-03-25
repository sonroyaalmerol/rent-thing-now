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
  .mutation(async ({ input, ctx }) => {
    const thingApplication = await prisma.thingApplication.findUnique({
      where: {
        id: input.id,
      },
      include: {
        thing: true,
        renter: true,
      },
    });

    if (!thingApplication) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (thingApplication.thing.ownerId !== ctx.session.user.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    switch (thingApplication.status) {
      case ThingApplicationStatus.PENDING: {
        const stripeSession = await createSession(thingApplication);

        await prisma.thingApplication.update({
          where: {
            id: input.id,
          },
          data: {
            status: ThingApplicationStatus.WAITING_PAYMENT,
            stripeSessionId: stripeSession.id,
            stripeSessionUrl: stripeSession.url,
          },
        });
        break;
      }
      case ThingApplicationStatus.WAITING_PAYMENT: {
        const stripeSession = await getSession(thingApplication.stripeSessionId ?? '');

        if (stripeSession.payment_status !== 'paid') {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Payment not completed!' });
        }

        await prisma.thingApplication.update({
          where: {
            id: input.id,
          },
          data: {
            status: ThingApplicationStatus.PAID,
          },
        });
        break;
      }
      case ThingApplicationStatus.PAID:
        await prisma.thingApplication.update({
          where: {
            id: input.id,
          },
          data: {
            status: ThingApplicationStatus.WAITING_PICKUP,
          },
        });
        break;
      case ThingApplicationStatus.WAITING_PICKUP:
        await prisma.thingApplication.update({
          where: {
            id: input.id,
          },
          data: {
            status: ThingApplicationStatus.PICKED_UP,
          },
        });
        break;
      case ThingApplicationStatus.PICKED_UP:
        await prisma.thingApplication.update({
          where: {
            id: input.id,
          },
          data: {
            status: ThingApplicationStatus.WAITING_RETURN,
          },
        });
        break;
      case ThingApplicationStatus.WAITING_RETURN:
        await prisma.thingApplication.update({
          where: {
            id: input.id,
          },
          data: {
            status: ThingApplicationStatus.RETURNED,
          },
        });
        break;
      case ThingApplicationStatus.RETURNED:
      case ThingApplicationStatus.CANCELED:
      default:
        break;
    }

    return true;
  });

import { z } from 'zod';
import { protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';

import prisma from '@/utils/prisma';

export default protectedProcedure
  .input(
    z.object({
      phoneNumber: z.string().nullable(),
      address: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      zip: z.string().nullable(),
      country: z.string().nullable(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    let profile = null;

    if (!ctx.session.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id as string,
      },
      include: {
        profile: true,
      },
    });

    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    if (!user.profile) {
      profile = await prisma.profile.create({
        data: {
          userId: ctx.session.user.id as string,
        },
      });
    } else {
      profile = await prisma.profile.findUnique({
        where: {
          id: user.profile?.id,
        },
      });
    }

    if (!profile) throw new TRPCError({ code: 'NOT_FOUND' });

    const updatedProfile = await prisma.profile.update({
      where: {
        id: profile?.id,
      },
      data: {
        phoneNumber: input.phoneNumber,
        address: input.address,
        city: input.city,
        state: input.state,
        zip: input.zip,
        country: input.country,
      },
    });

    return updatedProfile;
  });

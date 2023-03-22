import { z } from 'zod';
import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingStatus } from '@prisma/client';

export default procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {

    const data = await prisma.thing.findMany({
      where: {
        category: {
          some: {
            id: input.id,
          }
        },
        status: ThingStatus.AVAILABLE,
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        images: {
          select: {
            url: true,
            caption: true,
          },
        },
      }
    });

    return data;
  });

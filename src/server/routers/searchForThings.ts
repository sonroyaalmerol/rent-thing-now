import { z } from 'zod';
import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingStatus } from '@prisma/client';

export default procedure
  .input(
    z.object({
      query: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const things = await prisma.thing.findMany({
      where: {
        OR: [
          {
            title: {
              search: input.query as string,
            },
          },
          {
            description: {
              search: input.query as string,
            },
          },
          {
            location: {
              search: input.query as string,
            },
          },
        ],
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
      },
    });

    return things;
  });

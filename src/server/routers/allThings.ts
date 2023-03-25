import { procedure } from '@/server/trpc';

import prisma from '@/utils/prisma';
import { ThingStatus } from '@prisma/client';

export default procedure
  .query(async () => {
    const data = await prisma.thing.findMany({
      where: {
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
        reviews: true,
      },
      orderBy: {
        reviews: {
          _count: 'desc',
        },
      },
    });

    return data;
  });

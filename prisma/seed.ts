import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const categories = [
    { name: 'Work Tools', description: 'Tools for Work', slug: 'work-tools' },
    { name: 'Photography', description: 'Camera, lenses, you name it!', slug: 'photography' },
    { name: 'Gaming', description: 'Everything gaming!', slug: 'gaming' },
    { name: 'Instruments', description: 'Musical Instruments', slug: 'instruments' },
    { name: 'Winter Things', description: 'Things needed for winter', slug: 'winter-things' },
    { name: 'Sports', description: 'Sport equipments', slug: 'sports' },
  ];

  await Promise.all(
    categories.map(async (category) => prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        description: category.description,
        slug: category.slug,
      },
    })),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

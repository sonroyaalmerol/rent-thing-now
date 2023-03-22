import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import ThingCard from '@/components/Home/ThingCard';
import clsx from 'clsx';

import prisma from '@/utils/prisma';
import { Category } from '@prisma/client';
import trpc from '@/utils/trpc';

export const getServerSideProps: GetServerSideProps<{ category: Category }> = async (context) => {
  const { slug } = context.query;

  const category = await prisma.category.findUnique({
    where: {
      slug: slug as string,
    },
  });

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
    },
  };
};
// eslint-disable-next-line no-unused-vars
const CategoryPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ category }) => {
  const { data } = trpc.thingsByCategory.useQuery({
    id: category.id,
  });

  return (
    <>
      <Head>
        <title>{`${category.name} | Rent Thing Now`}</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div
        key={category.slug}
        className={
        clsx([
          'grid',
          'grid-flow-row-dense',
          'md:grid-cols-2',
          'lg:grid-cols-3',
          'xl:grid-cols-4',
          'sm:mx-auto',
          'max-w-screen-2xl',
          'my-8',
        ])
      }
      >
        {data?.map((thing) => (
          <ThingCard
            key={thing.id}
            thing={thing}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryPage;

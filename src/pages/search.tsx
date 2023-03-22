import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import ThingCard from '@/components/Home/ThingCard';
import clsx from 'clsx';

import trpc from '@/utils/trpc';

// eslint-disable-next-line no-unused-vars
const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = trpc.searchForThings.useQuery({
    query: props.query as string,
  });

  return (
    <>
      <Head>
        <title>{`Search results for ${props.query as string} | Rent Thing Now`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={
        clsx([
          'grid',
          'grid-flow-row-dense',
          'md:grid-cols-2',
          'lg:grid-cols-3',
          'xl:grid-cols-4',
          'sm:mx-auto',
          'max-w-screen-2xl',
          'my-8'
        ])
      }>
        {data?.map((thing) => (
          <ThingCard
            key={thing.id}
            thing={thing}
          />
        ))}
      </div>
    </>
  )
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps<{ query: string | string[] | undefined }> = async (context) => {
  const { q } = context.query;

  if (!q) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      query: q,
    },
  };
}

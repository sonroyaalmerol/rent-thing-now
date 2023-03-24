import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import clsx from 'clsx';

import prisma from '@/utils/prisma';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { Thing, ThingApplication } from '@prisma/client';
import NoThingsFound from '@/components/NoThingsFound';
import BorrowedThingCard from '@/components/BorrowedThingCard';

export const getServerSideProps: GetServerSideProps<{ thingApplications: (ThingApplication & {
  thing: Thing & {
      owner: {
          name: string | null;
          email: string | null;
          image: string | null;
      };
      images: {
          url: string;
          caption: string;
      }[];
  };
})[] }> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const borrowedThings = await prisma.thingApplication.findMany({
    where: {
      renterId: session?.user?.id ?? '',
    },
    include: {
      thing: {
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
      },
    },
  });

  return {
    props: {
      thingApplications: borrowedThings,
    },
  };
};
// eslint-disable-next-line no-unused-vars
const BorrowedThingsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ thingApplications }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Borrowed Things | Rent Thing Now</title>
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
      className={
        clsx([
          'sm:mx-auto',
          'max-w-screen-2xl',
          'my-8',
        ])
      }
    >
      <h1 className="text-3xl font-bold text-gray-900">
        Borrowed Things
      </h1>
    </div>
    { (thingApplications?.length === 0) && (
      <NoThingsFound />
    ) }
    <div
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
      {thingApplications?.map((application) => (
        <BorrowedThingCard
          key={application.id}
          application={application}
        />
      ))}
    </div>
  </>
);

export default BorrowedThingsPage;

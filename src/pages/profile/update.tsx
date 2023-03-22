import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import clsx from 'clsx';

import prisma from '@/utils/prisma';
import { Profile, Thing, ThingImage, User } from '@prisma/client';
import trpc from '@/utils/trpc';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

// eslint-disable-next-line no-unused-vars
const ProfileUpdatePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{`Update Profile | ${props.user.name} | Rent Thing Now`}</title>
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

      </div>
    </>
  )
};

export const getServerSideProps: GetServerSideProps<{ user: (User & {
  profile: Profile | null;
}) }> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id ?? '',
    },
    include: {
      profile: true,
    }
  })

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default ProfileUpdatePage;
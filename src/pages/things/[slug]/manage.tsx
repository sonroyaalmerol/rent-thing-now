import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import clsx from 'clsx';

import prisma from '@/utils/prisma';
import {
  Thing, ThingImage,
} from '@prisma/client';

import { Tabs } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Images from '@/components/ThingPage/Management/Images';

export const getServerSideProps: GetServerSideProps<{ thing:(Thing & {
  images: ThingImage[];
}) }> = async (context) => {
  const { slug } = context.query;
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const thing = await prisma.thing.findFirst({
    where: {
      slug: slug as string,
      ownerId: session?.user?.id ?? '',
    },
    include: {
      images: true,
    },
  });

  if (!thing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      thing,
    },
  };
};

// eslint-disable-next-line no-unused-vars
const ThingDetails: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ thing }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>{`${thing.title} Management | Rent Thing Now`}</title>
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
      key={thing.slug}
      className={
        clsx([
          'max-w-5xl',
          'my-8',
          'mx-auto',
          'px-4',
        ])
      }
    >
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        {`Management - ${thing.title}`}
      </h1>
      <Tabs.Group
        aria-label="Management Tabs"
      >
        <Tabs.Item
          active
          title="Applications"
          icon={MdDashboard}
        >
          Applications
        </Tabs.Item>
        <Tabs.Item
          title="Images"
          icon={HiUserCircle}
        >
          <Images
            thing={thing}
          />
        </Tabs.Item>
        <Tabs.Item
          title="Change Details"
          icon={FaCog}
        >
          Change Details
        </Tabs.Item>
      </Tabs.Group>
    </div>
  </>
);

export default ThingDetails;
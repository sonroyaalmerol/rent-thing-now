import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';

import React from 'react';

import clsx from 'clsx';

import prisma from '@/utils/prisma';
import {
  Category, Thing, ThingImage, ThingReview, User,
} from '@prisma/client';

import RentalForm from '@/components/ThingPage/RentalForm';
import ThingHeader from '@/components/ThingPage/Header';
import ThingDescription from '@/components/ThingPage/Description';
import PhotoShowcase from '@/components/ThingPage/PhotoShowcase';
import Subheader from '@/components/ThingPage/Subheader';
import Divider from '@/components/ThingPage/Divider';
import DetailsContainer from '@/components/ThingPage/DetailsContainer';
import ReviewSummary from '@/components/ThingPage/ReviewSummary';
import ReviewList from '@/components/ThingPage/ReviewList';
import ReviewForm from '@/components/ThingPage/ReviewForm';
import { useSession } from 'next-auth/react';
import { Button } from 'flowbite-react';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{ thing: (Thing & {
  images: ThingImage[];
  reviews: ThingReview[];
  category: Category[];
  owner: User;
}) }> = async (context) => {
  const { slug } = context.query;

  const thing = await prisma.thing.findUnique({
    where: {
      slug: slug as string,
    },
    include: {
      images: true,
      reviews: true,
      category: true,
      owner: true,
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
> = ({ thing }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>{`${thing.title} | Rent Thing Now`}</title>
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
        <ThingHeader thing={thing} />
        <PhotoShowcase thing={thing} />

        <DetailsContainer>
          <ThingDescription thing={thing} />

          <Divider />

          { thing.ownerId !== session?.data?.user?.id ? (
            <div className={clsx([
              'flex',
              'flex-col',
              'w-full',
            ])}
            >
              <Subheader
                className="mb-1"
                title="Rent this Thing"
              />

              <div className={clsx([
                'flex',
                'flex-col',
                'w-full',
              ])}
              >
                <RentalForm thing={thing} />
              </div>
            </div>
          ) : (
            <div className={clsx([
              'flex',
              'flex-col',
              'w-full',
            ])}
            >
              <Subheader
                className="mb-1"
                title="Manage this Thing"
              />

              <div className={clsx([
                'flex',
                'flex-col',
                'w-full',
                'mt-4',
              ])}
              >
                <Link href={`/things/${thing.slug}/manage`}>
                  <Button
                    type="button"
                  >
                    Manage
                  </Button>
                </Link>
                { /* Update form here */ }
              </div>

            </div>
          ) }

          <Divider />

          <div
            id="reviews_section"
            className={clsx([
              'flex',
              'flex-col',
              'w-full',
              'gap-4',
            ])}
          >
            <Subheader title="Reviews" />
            <ReviewSummary thing={thing} />
            <ReviewList thing={thing} />

            { thing.ownerId !== session?.data?.user?.id ? (
              <ReviewForm thing={thing} />
            ) : null }

          </div>
        </DetailsContainer>
      </div>
    </>
  );
};

export default ThingDetails;

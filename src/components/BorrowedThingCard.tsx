import { Thing, ThingApplication, Payment } from '@prisma/client';
import clsx from 'clsx';
import { Carousel } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

import dayjs from 'dayjs';

import { currencyFormat } from 'simple-currency-format';
import ApplicationStatusBadge from './ApplicationStatusBadge';

interface BorrowedThingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  application: ThingApplication & {
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
    payments: Payment[];
  }
}

const BorrowedThingCard: React.FC<BorrowedThingCardProps> = ({ application, ...props }) => {
  const { thing, payments } = application;

  const humanizedPayments = React.useMemo(() => {
    const totalPayments = payments.reduce((acc, payment) => acc + payment.amount, 0);
    const totalPaymentsFormatted = currencyFormat(totalPayments, 'en-US', 'CAD');

    return `${totalPaymentsFormatted} paid`;
  }, [payments]);

  const humanizedDateRange = React.useMemo(() => {
    const endDate = dayjs(application.endDate);
    const startDate = dayjs(application.startDate);

    return `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;
  }, [application]);

  return (
    <div
      {...props}
      className={
    clsx([
      'inline-block',
      'm-4',
      'mx-auto',
      'w-80',
      'box-border',
    ])
  }
    >
      <div className="flex items-center justify-center mb-4 bg-gray-100 h-80 w-80 rounded-xl">
        <Carousel
          slide={false}
          indicators={false}
        >
          { thing.images.map((image) => (
            <img
              key={image.url}
              className="object-cover w-full h-full rounded-xl"
              src={image?.url ?? 'https://loremflickr.com/640/640'}
              alt={image?.caption ?? 'Thing Image'}
            />
          ))}
        </Carousel>
      </div>
      <Link
        href={`/things/${thing.slug}`}
        className="flex flex-col items-start justify-start w-full"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">{thing.title}</h3>
          </div>
          <div className="flex items-center justify-end">
            <ApplicationStatusBadge
              status={application.status}
            />
          </div>
        </div>
        <p className="mb-2 text-sm text-gray-600 line-clamp-2">{thing.description}</p>
        <p className="mb-2 text-sm text-black">
          Applied for:
          {' '}
          {humanizedDateRange}
        </p>
        <p className="mb-2 text-sm text-black">
          Payment History:
          {' '}
          {humanizedPayments}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start gap-1 mr-2">
            <p className="text-2xl font-bold text-black ">{currencyFormat(application.totalPrice, 'en-US', 'USD')}</p>
            <span className="text-xs font-semibold text-gray-600">TOTAL</span>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-sm text-gray-600">{thing.owner.name}</p>
            <img
              className="object-cover w-8 h-8 ml-2 rounded-full"
              src={thing.owner.image ?? 'https://loremflickr.com/640/640'}
              alt={thing.owner.name ?? 'User Image'}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BorrowedThingCard;

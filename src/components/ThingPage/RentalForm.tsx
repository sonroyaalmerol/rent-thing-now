import React from 'react';
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import trpc from '@/utils/trpc';
import {
  Category, Profile, Thing, ThingImage, ThingReview, User,
} from '@prisma/client';
import dayjs from 'dayjs';

import { toast } from 'react-hot-toast';
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge';
import Link from 'next/link';
import RequestForm from './RequestForm';

interface RentalFormProps {
  thing: (Thing & {
    images: ThingImage[];
    reviews: ThingReview[];
    category: Category[];
    owner: User & {
      profile: Profile | null;
    };
  }),
}

const RentalForm: React.FC<RentalFormProps> = ({ thing }) => {
  const [dateRange, setDateRange] = React.useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  });

  const sureDateRange = React.useMemo(() => ({
    startDate: new Date(dateRange?.startDate ?? '') as Date,
    endDate: new Date(dateRange?.endDate ?? '') as Date,
  }), [dateRange]);

  const [comment, setComment] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleDateRangeChange = (newValue: DateValueType) => {
    setDateRange(newValue);
  };

  const rentMutation = trpc.rentThing.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    rentMutation.mutate({
      thingId: thing.id,
      startDate: sureDateRange.startDate as Date,
      endDate: sureDateRange.endDate as Date,
      message: comment,
      quantity,
    });
  };

  const clearForm = () => {
    setDateRange({
      startDate: new Date(),
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    setComment('');
    setQuantity(1);
  };

  const { data, refetch } = trpc.userCanRentThing.useQuery({
    thingId: thing.id,
  });

  const {
    data: currentApplication,
    refetch: refetchApplication,
  } = trpc.thingCurrentApplication.useQuery({
    id: thing.id,
  });

  const humanizedDateRange = React.useMemo(() => {
    if (currentApplication?.startDate && currentApplication?.endDate) {
      return `${dayjs(currentApplication?.startDate).format('MMM D')} - ${dayjs(currentApplication?.endDate).format('MMM D')}`;
    }
    return '';
  }, [currentApplication]);

  const { data: availableQuantity, isFetched } = trpc.thingAvailability.useQuery({
    id: thing.id,
    startDate: sureDateRange.startDate as Date,
    endDate: sureDateRange.endDate as Date,
  });

  const cancelMutation = trpc.thingApplicationCanceled.useMutation();

  React.useEffect(() => {
    if (!rentMutation.isLoading) {
      if (rentMutation.isSuccess) {
        toast.success('Rental request sent! Please wait for the owner to approve your request.');
        clearForm();
        refetch();
        refetchApplication();
      } else if (rentMutation.isError) {
        toast.error('Something went wrong!');
      }
    }
  }, [
    refetch,
    refetchApplication,
    rentMutation.isError,
    rentMutation.isLoading,
    rentMutation.isSuccess,
  ]);

  const { data: isPaid, refetch: paymentRefetch } = trpc.checkApplicationPayment.useQuery({
    id: currentApplication?.id ?? '',
  });

  React.useEffect(() => {
    paymentRefetch();
    refetchApplication();
  }, [paymentRefetch, refetchApplication]);

  if (!data) {
    return (
      <div className="flex flex-col gap-1">
        <span className="my-2 text-lg font-semibold">
          Ongoing rental request
        </span>
        <span className="text-gray-500">
          Date:
          {' '}
          {humanizedDateRange}
        </span>
        <span className="text-gray-500">
          Quantity:
          {' '}
          {currentApplication?.quantity}
        </span>
        <span className="text-gray-500">
          Message you sent:
          {' '}
          {currentApplication?.message}
        </span>
        <div className="flex flex-row items-center gap-4 mt-4">
          <span className="text-gray-500">
            Status:
          </span>
          <ApplicationStatusBadge status={currentApplication?.status ?? 'PENDING'} />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4 mt-4">
          { (!isPaid && currentApplication?.status === 'WAITING_PAYMENT') && (
            <Link
              href={currentApplication?.stripeSessionUrl ?? ''}
              target="_blank"
              className="w-full"
            >
              <Button
                color="green"
                className="w-full"
              >
                Pay now
              </Button>
            </Link>
          ) }
          <Button
            color="red"
            className="w-full"
            onClick={async () => {
              await cancelMutation.mutateAsync({
                id: currentApplication?.id ?? '',
              });
              refetch();
              toast.success('Rental request cancelled!');
            }}
            disabled={cancelMutation.isLoading}
          >
            Cancel request
          </Button>
        </div>

        <RequestForm
          thing={thing}
        />
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="block mb-2">
          <Label
            value="When do you want to rent this Thing?"
          />
        </div>
        <Datepicker
          minDate={new Date()}
          value={dateRange}
          onChange={handleDateRangeChange}
        />
        { !isFetched ? (
          <div className="flex flex-col gap-4 mt-4">
            <span className="text-gray-500">
              Checking availability...
            </span>
          </div>
        ) : null }
        { (isFetched && availableQuantity === 0) ? (
          <div className="flex flex-col gap-4 mt-4">
            <span className="text-gray-500">
              This Thing is not available for the selected dates.
            </span>
          </div>
        ) : null}
        { (isFetched && availableQuantity && availableQuantity > 0) ? (
          <>
            <div className="block mt-4 mb-2">
              <Label
                htmlFor="comment"
                value="Why do you want to rent this Thing?"
              />
            </div>
            <Textarea
              id="comment"
              required
              rows={4}
              helperText="Please be specific as this will affect your rental application."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="block mt-4 mb-2">
              <Label
                htmlFor="quantity"
                value="How many of these Things do you want to rent?"
              />
            </div>
            <TextInput
              id="quantity"
              required
              type="number"
              min={1}
              max={availableQuantity}
              defaultValue={1}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </>
        ) : null }

      </div>
      { (isFetched && availableQuantity && availableQuantity > 0) ? (
        <Button type="submit">
          Rent Thing Now
        </Button>
      ) : null }
    </form>
  );
};

export default RentalForm;

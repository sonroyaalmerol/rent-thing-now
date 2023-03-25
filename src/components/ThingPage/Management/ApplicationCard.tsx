import ApplicationStatusBadge from '@/components/ApplicationStatusBadge';
import trpc from '@/utils/trpc';
import {
  Profile, Thing, ThingApplication, User,
} from '@prisma/client';
import clsx from 'clsx';
import React from 'react';
import dayjs from 'dayjs';
import { Button } from 'flowbite-react';
import { toast } from 'react-hot-toast';
import { currencyFormat } from 'simple-currency-format';

interface ApplicationCardProps {
  thingApplication: ThingApplication & {
    thing: Thing;
    renter: User & {
        profile: Profile | null;
    };
  };
  disabled?: boolean;
  refetch: () => Promise<any>;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  thingApplication, disabled, refetch,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const humanizedDateRange = React.useMemo(() => {
    const startDate = dayjs(thingApplication.startDate);
    const endDate = dayjs(thingApplication.endDate);
    const diff = endDate.diff(startDate, 'day');
    if (diff === 0) {
      return `${startDate.format('MMM DD, YYYY')}`;
    }
    return `${startDate.format('MMM DD, YYYY')} - ${endDate.format('MMM DD, YYYY')}`;
  }, [thingApplication.startDate, thingApplication.endDate]);

  const approveApplicationMutation = trpc.thingApplicationApprove.useMutation();
  const rejectApplicationMutation = trpc.thingApplicationReject.useMutation();

  const approveText = React.useMemo(() => {
    switch (thingApplication.status) {
      case 'PENDING':
        return 'Approve';
      case 'WAITING_PAYMENT':
        return 'Check Payment';
      case 'PAID':
        return 'Item Ready';
      case 'WAITING_PICKUP':
        return 'Confirm Pickup';
      case 'PICKED_UP':
        return 'Time to Return!';
      case 'WAITING_RETURN':
        return 'Confirm Return';
      default:
        return '';
    }
  }, [thingApplication.status]);

  return (
    <div className={clsx([
      'flex',
      'flex-col',
      'gap-2',
      'p-4',
      'bg-white',
      'rounded-lg',
      'shadow',
    ])}
    >
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {thingApplication.renter.name}
        </h2>
        <p className="text-gray-600">
          {thingApplication.renter.email}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-fit">
        <ApplicationStatusBadge
          status={thingApplication.status}
        />
      </div>
      <p className="">
        {humanizedDateRange}
      </p>
      <p className="text-gray-600">
        Contact Number:
        {' '}
        {thingApplication.renter.profile?.phoneNumber ?? 'N/A'}
      </p>
      <p className="text-gray-600">
        {thingApplication.message}
      </p>
      <div className="flex items-center justify-start gap-1 mr-2">
        <p className="text-2xl font-bold text-black ">{currencyFormat(thingApplication.totalPrice, 'en-US', 'USD')}</p>
        <span className="text-xs font-semibold text-gray-600">TOTAL</span>
      </div>
      { disabled ? null : (
        <div className="grid grid-cols-2 gap-2">
          { approveText ? (
            <Button
              color="green"
              onClick={async () => {
                setIsLoading(true);
                try {
                  await approveApplicationMutation.mutateAsync({
                    id: thingApplication.id,
                  });
                  toast.success('Application moved to the next phase!');
                } catch (e: any) {
                  toast.error(e.message);
                }
                setIsLoading(false);
                refetch();
              }}
              disabled={isLoading}
            >
              { approveText }
            </Button>
          ) : null }

          <Button
            color="red"
            onClick={async () => {
              setIsLoading(true);
              await rejectApplicationMutation.mutateAsync({
                id: thingApplication.id,
              });
              setIsLoading(false);
              refetch();
              toast.success('Application rejected!');
            }}
            disabled={isLoading}
          >
            Reject
          </Button>
        </div>
      ) }
    </div>
  );
};

export default ApplicationCard;

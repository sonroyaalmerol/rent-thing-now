import React from 'react';
import { Button, Label, Textarea } from 'flowbite-react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import trpc from '@/utils/trpc';
import { Thing } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface RentalFormProps {
  thing: Thing,
}

const RentalForm: React.FC<RentalFormProps> = ({ thing }) => {
  const session = useSession();

  const [dateRange, setDateRange] = React.useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)),
  });

  const handleDateRangeChange = (newValue: DateValueType) => {
    setDateRange(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { data } = trpc.userCanRentThing.useQuery({
    thingId: thing.id,
    userId: session?.data?.user?.id ?? '',
  });

  if (!data) {
    return (
      <div className="flex flex-col gap-4">
        <span className="text-gray-500">
          You already have an ongoing rental request for this Thing!
        </span>
        <Link href="/borrowed">
          <Button>
            View Rental Request
          </Button>
        </Link>
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
        />
      </div>
      <Button type="submit">
        Rent Thing Now
      </Button>
    </form>
  );
};

export default RentalForm;

import React from 'react';
import { Button, Label, Textarea } from 'flowbite-react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

const RentalForm = () => {
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

import React from 'react';
import { Button, Label, Textarea } from 'flowbite-react';
import { Thing } from '@prisma/client';
import trpc from '@/utils/trpc';

interface ReviewFormProps extends React.HTMLAttributes<HTMLFormElement> {
  thing: Thing;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ thing }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { data } = trpc.userCanReviewThing.useQuery({
    thingId: thing.id,
  });

  if (!data) {
    return (
      <div className="block mx-auto">
        <p className="text-sm italic text-center text-gray-600">
          Rent Thing Now to leave a review!
        </p>
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
            value="How many stars would you give this Thing?"
          />
        </div>
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="comment"
            value="What did you like/dislike about this Thing?"
          />
        </div>
        <Textarea
          id="comment"
          required
          rows={4}
        />
      </div>
      <Button type="submit">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;

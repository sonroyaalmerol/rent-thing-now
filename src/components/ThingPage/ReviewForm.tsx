import React from 'react';
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import { Thing } from '@prisma/client';
import trpc from '@/utils/trpc';

import { toast } from 'react-hot-toast';

interface ReviewFormProps extends React.HTMLAttributes<HTMLFormElement> {
  thing: Thing;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ thing }) => {
  const reviewMutation = trpc.reviewThing.useMutation();

  const [numberOfStars, setNumberOfStars] = React.useState(1);
  const [comment, setComment] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await reviewMutation.mutateAsync({
      thingId: thing.id,
      rating: numberOfStars,
      review: comment,
    });
    toast.success('Review submitted!');
    setIsLoading(false);
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
          <TextInput
            id="numberOfStars"
            required
            type="number"
            min={1}
            max={5}
            defaultValue={1}
            step={1}
            value={numberOfStars}
            onChange={(e) => setNumberOfStars(Number(e.target.value))}
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
      >
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;

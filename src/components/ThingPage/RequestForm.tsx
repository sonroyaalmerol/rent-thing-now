import React from 'react';
import {
  Button,
} from 'flowbite-react';
import trpc from '@/utils/trpc';
import {
  Category, Profile, Thing, ThingImage, ThingReview, User,
} from '@prisma/client';
import dayjs from 'dayjs';

interface RequestFormProps {
  thing: (Thing & {
    images: ThingImage[];
    reviews: ThingReview[];
    category: Category[];
    owner: User & {
      profile: Profile | null;
    };
  }),
}

const RequestForm: React.FC<RequestFormProps> = ({ thing }) => {
  const [message, setMessage] = React.useState<string>('');

  const { data: supportRequests, refetch } = trpc.supportRequests.useQuery({
    thingId: thing.id,
  });

  const newRequestMutation = trpc.newSupportRequest.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newRequestMutation.mutate({
      thingId: thing.id,
      description: message,
    }, {
      onSuccess: () => {
        setMessage('');
        refetch();
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="my-2 mt-8 text-lg font-semibold">
        Support Requests
      </span>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Write a message to the owner"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          type="submit"
          color="green"
          className="w-full"
          disabled={newRequestMutation.isLoading}
        >
          Send message
        </Button>
      </form>

      {/* List of requests alongside replies */}

      <div className="flex flex-col gap-4 mt-4">
        {supportRequests?.map((request) => (
          <div
            key={request.id}
            className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md"
          >
            <div className="flex flex-row items-center gap-4">
              <span className="font-bold text-black">
                {request.renter?.name}
              </span>
              <span className="text-gray-500">
                {dayjs(request.requestDate).format('MMM D, YYYY')}
              </span>
            </div>
            <span className="text-black">
              {request.description}
            </span>
            { request.reply && (
              <div className="flex flex-col gap-4 p-4 ml-2 border border-gray-300 rounded-md">
                <div className="flex flex-row items-center gap-4">
                  <span className="font-bold text-black">
                    {thing.owner?.name}
                  </span>
                  <span className="text-gray-500">
                    {dayjs(request.reply?.replyDate).format('MMM D, YYYY')}
                  </span>
                </div>
                <span className="text-black">
                  {request.reply?.reply}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestForm;

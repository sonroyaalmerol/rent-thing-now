import React from 'react';
import {
  Button,
} from 'flowbite-react';
import trpc from '@/utils/trpc';
import {
  Profile, Thing, ThingImage, User, SupportRequest, SupportReply,
} from '@prisma/client';
import dayjs from 'dayjs';

interface RequestFormProps {
  thing: (Thing & {
    images: ThingImage[];
    owner: User & {
      profile: Profile | null;
    };
  }),
}

interface ReplyCardProps {
  key: string,
  request: SupportRequest & {
    renter: User;
    reply: SupportReply | null;
  },
  refetch: () => void,
  thing: (Thing & {
    images: ThingImage[];
    owner: User & {
      profile: Profile | null;
    };
  }),
}

const ReplyCard: React.FC<ReplyCardProps> = ({
  key, request, refetch, thing,
}) => {
  const [message, setMessage] = React.useState<string>('');

  const newReplyMutation = trpc.replySupportRequest.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newReplyMutation.mutate({
      requestId: request.id,
      reply: message,
    }, {
      onSuccess: () => {
        setMessage('');
        refetch();
      },
    });
  };

  return (
    <div
      key={key}
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
      { request.reply ? (
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
      ) : (
        <div className="p-4 ml-2 border border-gray-300 rounded-md">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write a reply to the renter"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              color="green"
              className="w-full"
              disabled={newReplyMutation.isLoading}
            >
              Send message
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

const RequestForm: React.FC<RequestFormProps> = ({ thing }) => {
  const { data: supportRequests, refetch } = trpc.supportRequests.useQuery({
    thingId: thing.id,
  });

  return (
    <div className="flex flex-col gap-1">
      <span className="my-2 mt-8 text-lg font-semibold">
        Support Requests
      </span>
      {/* List of requests alongside replies */}

      <div className="flex flex-col gap-4 mt-4">
        {supportRequests?.map((request) => (
          <ReplyCard
            key={request.id}
            request={request}
            refetch={refetch}
            thing={thing}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestForm;

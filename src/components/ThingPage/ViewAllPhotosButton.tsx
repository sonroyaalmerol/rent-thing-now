import {
  Category, Thing, ThingImage, ThingReview, User,
} from '@prisma/client';
import clsx from 'clsx';
import { Carousel } from 'flowbite-react';
import React from 'react';
import { HiViewGrid } from 'react-icons/hi';

import dynamic from 'next/dynamic';

const Modal = dynamic(
  () => import('flowbite-react').then((c) => c.Modal),
  {
    ssr: false,
  },
);

const ModalHeader = dynamic(
  () => import('flowbite-react').then((c) => c.Modal.Header),
  {
    ssr: false,
  },
);

const ModalBody = dynamic(
  () => import('flowbite-react').then((c) => c.Modal.Body),
  {
    ssr: false,
  },
);

interface ViewAllPhotosButtonProps {
  thing: (Thing & {
    images: ThingImage[];
    reviews: ThingReview[];
    category: Category[];
    owner: User;
  })
}

const ViewAllPhotosButton: React.FC<ViewAllPhotosButtonProps> = ({ thing }) => {
  const [showModal, setShowModal] = React.useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        type="button"
        className={clsx([
          'bg-white',
          'rounded-lg',
          'p-2',
          'border',
          'border-black',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-offset-2',
          'focus:ring-offset-gray-100',
          'focus:ring-indigo-500',
        ])}
        onClick={onOpen}
      >
        <div className="flex flex-row items-center gap-2">
          <HiViewGrid />
          View all photos
        </div>
      </button>
      <Modal
        dismissible
        show={showModal}
        onClose={onClose}
      >
        <ModalHeader>
          {`${thing.title} Photos`}
        </ModalHeader>
        <ModalBody className="h-[60vh]">
          <Carousel
            slide={false}
            indicators
          >
            { thing.images.map((image) => (
              <img
                key={image.url}
                className="object-contain w-full h-full rounded-xl"
                src={image?.url ?? 'https://loremflickr.com/640/640'}
                alt={image?.caption ?? 'Thing Image'}
              />
            ))}
          </Carousel>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewAllPhotosButton;

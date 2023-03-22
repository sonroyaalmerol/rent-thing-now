import React from 'react';

import clsx from 'clsx';

import { Thing, ThingImage } from '@prisma/client';

interface PhotoShowcaseProps {
  thing: (Thing & {
    images: ThingImage[];
  });
}

const PhotoShowcase: React.FC<PhotoShowcaseProps> = ({ thing }) => {
  // useMemo of 4 next images for the carousel
  const imagesForGrid = React.useMemo(() => {
    // return array of 4 images, if less than 4, add placeholder images
    const images = [...thing.images];
    images.shift();

    const tmpImage: ThingImage[] = [];
    for (let i = 0; i < 4; i++) {
      if (images[i]) {
        tmpImage.push(images[i]);
      } else {
        tmpImage.push({
          id: `placeholder-${i}`,
          caption: 'Placeholder Image',
          url: '/default_large.png',
          thingId: thing.id,
        });
      }
    }
    return tmpImage;
  }, [thing.id, thing.images]);

  return (
    <div className={clsx([
      'flex',
      'flex-row',
      'w-full',
      'mt-8',
    ])}
    >
      <div className={clsx([
        'flex',
        'flex-col',
        'lg:w-1/2',
        'w-full',
        'mr-2',
        'h-96',
      ])}
      >
        <div className={clsx([
          'flex',
          'flex-col',
          'w-full',
          'h-96',
          'rounded-lg',
          'overflow-hidden',
          'shadow-md',
        ])}
        >
          <img
            className={clsx([
              'w-full',
              'h-full',
              'object-cover',
              'object-center',
            ])}
            src={thing.images[0].url}
            alt={thing.title}
          />
        </div>
      </div>
      <div className={clsx([
        'grid',
        'grid-cols-2',
        'gap-2',
        'w-1/2',
        'lg:grid',
        'hidden',
      ])}
      >
        {imagesForGrid.map((image) => (
          <div
            key={image.id}
            className={clsx([
              'flex',
              'flex-col',
              'w-full',
              'rounded-lg',
              'overflow-hidden',
              'shadow-md',
            ])}
          >
            <img
              className={clsx([
                'w-full',
                'h-full',
                'object-cover',
                'object-center',
              ])}
              src={image.url}
              alt={thing.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoShowcase;

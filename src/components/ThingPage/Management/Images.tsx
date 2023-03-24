import React from 'react';

import { Thing, ThingImage } from '@prisma/client';
import PhotoShowcase from '../PhotoShowcase';

interface ImagesProps {
  thing: (Thing & {
    images: ThingImage[];
  });
}

const Images: React.FC<ImagesProps> = ({ thing }) => {
  const [images, setImages] = React.useState<ThingImage[]>([]);

  React.useEffect(() => {
    setImages([...thing.images]);
  }, [thing.images]);

  const modifiedThing = React.useMemo(() => ({
    ...thing,
    images,
  }), [images, thing]);

  return (
    <PhotoShowcase
      thing={modifiedThing}
    />
  );
};

export default Images;

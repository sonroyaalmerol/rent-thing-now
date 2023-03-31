import React from 'react';

import { Thing, ThingImage } from '@prisma/client';
import { Button, TextInput } from 'flowbite-react';
import trpc from '@/utils/trpc';
import { toast } from 'react-hot-toast';
import PhotoShowcase from '../PhotoShowcase';

interface ImagesProps {
  thing: (Thing & {
    images: ThingImage[];
  });
}

const Images: React.FC<ImagesProps> = ({ thing }) => {
  const [images, setImages] = React.useState<ThingImage[]>([
    {
      id: 'default1',
      url: '',
      thingId: '',
      caption: '',
      createdAt: new Date(),
    },
    {
      id: 'default2',
      url: '',
      thingId: '',
      caption: '',
      createdAt: new Date(),
    },
    {
      id: 'default3',
      url: '',
      thingId: '',
      caption: '',
      createdAt: new Date(),
    },
    {
      id: 'default4',
      url: '',
      thingId: '',
      caption: '',
      createdAt: new Date(),
    },
    {
      id: 'default5',
      url: '',
      thingId: '',
      caption: '',
      createdAt: new Date(),
    },
  ]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const imagesMutation = trpc.updateThingImages.useMutation();

  React.useEffect(() => {
    if (thing.images.length === 0) return;
    setImages([...thing.images]);
    if (thing.images.length < 5) {
      setImages((prev) => {
        const tmp = [...prev];
        for (let i = thing.images.length; i < 5; i += 1) {
          tmp.push({
            id: `default${i + 1}`,
            url: '',
            thingId: '',
            caption: '',
            createdAt: new Date(),
          });
        }
        return tmp;
      });
    }
  }, [thing.images]);

  const modifiedThing = React.useMemo(() => ({
    ...thing,
    images,
  }), [images, thing]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await imagesMutation.mutateAsync({
      thingId: thing.id,
      urls: images.map((image) => (image.url)),
    });
    toast.success('Images updated');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Preview</h2>
      <PhotoShowcase
        thing={modifiedThing}
      />
      <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">Change URLs</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextInput
            value={images[0]?.url}
            onChange={(e) => {
              setImages((prev) => {
                const tmp = [...prev];
                console.log(tmp);
                tmp[0].url = e.target.value;
                return tmp;
              });
            }}
          />
          <TextInput
            value={images[1]?.url}
            onChange={(e) => {
              setImages((prev) => {
                const tmp = [...prev];
                tmp[1].url = e.target.value;
                return tmp;
              });
            }}
          />
          <TextInput
            value={images[2]?.url}
            onChange={(e) => {
              setImages((prev) => {
                const tmp = [...prev];
                tmp[2].url = e.target.value;
                return tmp;
              });
            }}
          />
          <TextInput
            value={images[3]?.url}
            onChange={(e) => {
              setImages((prev) => {
                const tmp = [...prev];
                tmp[3].url = e.target.value;
                return tmp;
              });
            }}
          />
          <TextInput
            value={images[4]?.url}
            onChange={(e) => {
              setImages((prev) => {
                const tmp = [...prev];
                tmp[4].url = e.target.value;
                return tmp;
              });
            }}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>

  );
};

export default Images;

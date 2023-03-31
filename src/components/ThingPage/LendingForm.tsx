import React from 'react';

import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import { Thing } from '@prisma/client';

interface LendingFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: {
    title: string;
    description: string;
    location: string;
    equipmentType: string;
    rate: number;
    quantity: number;
  }) => void;
  thing?: Thing;
}

// eslint-disable-next-line no-unused-vars
const LendingForm: React.FC<LendingFormProps> = ({ onSubmit, thing }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [equipmentType, setEquipmentType] = React.useState('');

  const [rate, setRate] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (thing) {
      setTitle(thing.title);
      setDescription(thing.description);
      setLocation(thing.location);
      setEquipmentType(thing.equipmentType);
      setRate(thing.rate);
      setQuantity(thing.quantity);
    }
  }, [thing]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          title,
          description,
          location,
          equipmentType,
          rate,
          quantity,
        });
      }}
    >
      <div>
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="title"
            value="Title"
          />
        </div>
        <TextInput
          id="title"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="description"
            value="Description"
          />
        </div>
        <Textarea
          id="description"
          required
          rows={4}
          helperText="Describe your Thing in detail."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="location"
            value="Location"
          />
        </div>
        <TextInput
          id="location"
          required
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="equipmentType"
            value="Equipment Type"
          />
        </div>
        <TextInput
          id="equipmentType"
          required
          type="text"
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
        />
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="rate"
            value="Rate per Day"
          />
        </div>
        <TextInput
          id="rate"
          required
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <div className="block mt-4 mb-2">
          <Label
            htmlFor="quantity"
            value="Quantity"
          />
        </div>
        <TextInput
          id="quantity"
          required
          type="number"
          min={1}
          step={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <Button type="submit">
        Lend Thing Now
      </Button>
    </form>
  );
};

export default LendingForm;

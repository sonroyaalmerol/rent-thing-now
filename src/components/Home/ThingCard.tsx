import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

import { currencyFormat } from 'simple-currency-format';

interface ThingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thing: {
    name: string;
    description: string;
    image: string;
    price: number;
    owner: {
      name: string;
      image: string;
    }
  };
}

const ThingCard: React.FC<ThingCardProps> = ({ thing, ...props }) => (
  <div {...props} className={
    clsx([
      'inline-block',
      'm-4',
      'mx-auto',
      'h-90',
      'w-80',
      'box-border',
    ])
  }>
    <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-xl w-80 h-80">
      <img
        className="object-cover w-full h-full rounded-xl"
        src={thing.image}
        alt={thing.name}
      />
    </div>
    <Link href="/" className="flex flex-col items-start justify-start w-full">
      
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{thing.name}</h3>
        </div>
        <div className="flex items-center justify-end">
          <FaStar className="mr-1" /> 4.5
        </div>
      </div>
      <p className="mb-2 text-sm text-gray-600">{thing.description}</p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start">
          <p className="mr-2 text-2xl font-bold text-black">{currencyFormat(thing.price, 'en-US', 'USD')}</p>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-sm text-gray-600">{thing.owner.name}</p>
          <img
            className="object-cover w-8 h-8 ml-2 rounded-full"
            src={thing.owner.image}
            alt={thing.owner.name}
          />
        </div>
      </div>
    </Link>
  </div>
);

export default ThingCard;
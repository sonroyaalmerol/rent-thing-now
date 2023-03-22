import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

interface LendThingCardProps extends React.HTMLAttributes<HTMLAnchorElement> {

}

const LendThingCard: React.FC<LendThingCardProps> = ({ ...props }) => (
  <Link
    href="/lend"
    type="button"
    {...props}
    className={
    clsx([
      'inline-block',
      'm-4',
      'mx-auto',
      'w-80',
      'box-border',
      'bg-gray-400',
      'rounded-lg',
      'shadow-lg',
      'hover:bg-gray-500',
      'transition',
      'duration-300',
      'ease-in-out',
      'active:bg-gray-600',
    ])
  }
  >
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 mb-4 rounded-xl">
      <FaPlusCircle className="text-6xl text-white" />
      <span className="italic text-white">Lend a Thing</span>
    </div>
  </Link>
);

export default LendThingCard;

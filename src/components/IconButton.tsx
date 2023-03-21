import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";

interface IconButtonProps extends LinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ active, ...props }) => (
  <Link {...props} className={
    clsx([
      'flex',
      'flex-col',
      'items-center',
      'gap-1',
      'text-gray-600',
      'hover:text-black',
      'hover:underline',
      'underline-offset-8',
      'decoration-2',
      'decoration-gray-400',
      'text-xl',
      active ? 'text-black' : '',
      active ? 'underline' : '',
      active ? 'decoration-black' : '',
    ])
  }>
    {props.icon}
    <div
      className={
        clsx([
          'text-xs',
        ])
      }
    >
      {props.label}
    </div>
  </Link>
);

export default IconButton;
import React from 'react';

import clsx from 'clsx';

interface SubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Subheader: React.FC<SubheaderProps> = ({ title, ...props }) => (
  <div
    className={clsx([
      'flex',
      'justify-between',
      'items-center',
      'mb-4',
    ])}
    {...props}
  >
    <div className={clsx([
      'flex',
      'flex-row',
      'items-center',
      'gap-2',
      'justify-start',
    ])}
    >
      <h2
        className={clsx([
          'text-2xl',
          'font-semibold',
          'text-gray-800',
        ])}
      >
        {title}
      </h2>
    </div>
  </div>
);

export default Subheader;

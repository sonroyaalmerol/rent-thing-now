import React from 'react';

import clsx from 'clsx';

interface DetailsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ children, ...props }) => (
  <div
    className={clsx([
      'flex',
      'flex-col',
      'w-full',
      'mt-8',
    ])}
    {...props}
  >
    {children}
  </div>
);

export default DetailsContainer;

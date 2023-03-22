import React from 'react';

import clsx from 'clsx';

const Divider: React.FC = () => (
  <hr
    className={
      clsx([
        'border',
        'border-gray-300',
        'my-8',
      ])
    }
  />
);

export default Divider;

import React from 'react';

const NoThingsFound = () => (
  <div className="flex flex-col items-center justify-center w-full my-11">
    <div className="text-2xl font-bold text-center">
      No Things found
    </div>
    <div className="text-center text-gray-500">
      Try searching for something else... or maybe lend a Thing?
    </div>
  </div>
);

export default NoThingsFound;

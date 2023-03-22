import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

interface SearchBarProps extends React.ComponentPropsWithoutRef<'div'> {
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <div
      className="relative hidden w-full max-w-xs mr-6 md:block"
      {...props}
    >
      <form onSubmit={handleSearch}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={
            clsx([
              'w-full',
              'py-2',
              'pl-4',
              'pr-4',
              'text-sm',
              'text-gray-700',
              'placeholder:text-gray-500',
              'bg-white',
              'border',
              'border-gray-300',
              'rounded-3xl',
              'focus:outline-none',
              'focus:border-blue-500',
              'focus:shadow',
            ])
          }
          type="text"
          placeholder="Find your thing..."
        />
      </form>
    </div>
  );
};

export default SearchBar;

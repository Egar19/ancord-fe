import React, { useState } from 'react';

function SearchBar({ onSearch, placeholder = 'Search record...' }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <label className='input'>
      <svg
        className='h-[1em] opacity-50'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <g
          strokeLinejoin='round'
          strokeLinecap='round'
          strokeWidth='2.5'
          fill='none'
          stroke='currentColor'
        >
          <circle cx='11' cy='11' r='8'></circle>
          <path d='m21 21-4.3-4.3'></path>
        </g>
      </svg>
      <input
        type='search'
        required
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className='w-full bg-transparent focus:outline-none'
      />
    </label>
  );
}

export default SearchBar;

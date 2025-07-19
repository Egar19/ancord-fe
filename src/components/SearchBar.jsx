import React, { useState } from 'react';

function SearchBar({ onSearch, placeholder = 'Cari transaksi...' }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-box border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base rounded-box"
      />
    </div>
  );
}

export default SearchBar;

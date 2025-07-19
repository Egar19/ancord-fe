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
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          fontSize: '1rem',
        }}
      />
    </div>
  );
}

export default SearchBar;

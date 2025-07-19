import { useState } from 'react';

export default function useSearch(records, keyList = ['title', 'description']) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter((record) => {
    if (!searchQuery) return true;
    return keyList.some((key) =>
      String(record[key] || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return {
    searchQuery,
    setSearchQuery,
    filteredRecords,
  };
}

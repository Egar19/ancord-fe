import { useState, useMemo } from 'react';

export function useSearch(records = [], keyList = ['title', 'description']) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return records;

    const lowerQuery = searchQuery.toLowerCase();

    return records.filter((record) =>
      keyList.some((key) =>
        String(record[key] || '')
          .toLowerCase()
          .includes(lowerQuery)
      )
    );
  }, [records, searchQuery, keyList]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRecords,
  };
}

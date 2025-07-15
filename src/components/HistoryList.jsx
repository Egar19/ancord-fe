import { useState } from 'react';
import HistoryBody from './HistoryItem';

const HistoryList = ({ records }) => {
  const [filter, setFilter] = useState('all');

  const filteredRecords = records.filter((record) => {
    if (filter === 'all') return true;
    return record.type === filter;
  });

  return (
    <div className='my-4'>
      <h2 className='text-xl'>History Dashboard</h2>

      {/* Tombol filter */}
      <div className='my-4 space-x-2'>
        <button
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-yellow-400' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'income' ? 'bg-green-400' : 'bg-gray-200'}`}
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'outcome' ? 'bg-red-400' : 'bg-gray-200'}`}
          onClick={() => setFilter('outcome')}
        >
          Outcome
        </button>
      </div>

      {/* Daftar histori */}
      <div className='py-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => <HistoryBody key={record.id} {...record} />)
        ) : (
          <p>Tidak ada data untuk filter ini</p>
        )}
      </div>
    </div>
  );
};

export default HistoryList;

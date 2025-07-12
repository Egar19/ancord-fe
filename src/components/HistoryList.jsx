import HistoryBody from './HistoryItem';

const HistoryList = ({ records }) => {
  return (
    <div className='my-4'>
      <h2 className='text-xl'>History Dashboard</h2>
      <div className='py-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
        {records.length > 0 ? (
          records.map((record) => <HistoryBody key={record.id} {...record} />)
        ) : (
          <p>Belum ada history</p>
        )}
      </div>
    </div>
  );
};

export default HistoryList;

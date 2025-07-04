import { FaGreaterThan } from 'react-icons/fa';

const HistoryDashboard = ({ amount, notes, date }) => {
  return (
    <div className='my-4'>
      <h2 className='text-xl'>History Dashboard</h2>
      <div className='py-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='p-4 bg-accent rounded'>
          <h3 className='text-xl'>Income</h3>
          <h4>Amount: {amount}</h4>
          <h4>Notes: {notes}</h4>
          <h4>Date: {date}</h4>
          <div className='flex justify-end'>
            <button className='inline-flex items-center gap-1 border rounded px-2 py-1 border-neutral-500 text-neutral-500 text-sm cursor-pointer'>
              Detail
              <FaGreaterThan className='text-xs' />
            </button>
          </div>
        </div>
        <div className='p-4 bg-accent rounded'>
          <h4 className='text-xl'>Outcome</h4>
          <h4>Amount: {amount}</h4>
          <h4>Notes: {notes}</h4>
          <h4>Date: {date}</h4>
          <div className='flex justify-end'>
            <button className='inline-flex items-center gap-1 border rounded px-2 py-1 border-neutral-500 text-neutral-500 text-sm cursor-pointer'>
              Detail
              <FaGreaterThan className='text-xs' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDashboard;

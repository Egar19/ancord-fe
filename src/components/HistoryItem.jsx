import { FaGreaterThan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HistoryItem = ({ id, type, amount, notes, date }) => {
  return (
    <div className='p-4 bg-accent rounded'>
      <h3 className='text-xl'>{type}</h3>
      <h4>Amount: {amount}</h4>
      <h4>Notes: {notes}</h4>
      <h4>Date: {date}</h4>
      <div className='flex justify-end'>
        <Link
          to={`/record/${id}`}
          className='inline-flex items-center gap-1 border rounded px-2 py-1 border-neutral-500 text-neutral-500 text-sm hover:bg-neutral-200 transition'
        >
          Detail
          <FaGreaterThan className='text-xs' />
        </Link>
      </div>
    </div>
  );
};

export default HistoryItem;
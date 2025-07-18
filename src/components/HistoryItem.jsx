import { FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/formatRupiah';

const HistoryItem = ({ id, type, amount, notes, date }) => {
  return (
    <div className='p-4 bg-base-300 rounded'>
      <h3 className='text-xl'>{type}</h3>
      <h4>Amount: {formatRupiah(amount)}</h4>
      <h4>Notes: {notes}</h4>
      <h4>Date: {date}</h4>
      <div className='flex justify-end'>
        <Link
          to={`/record/${id}`}
          className='inline-flex items-center gap-1 border rounded px-2 py-1 text-base-content text-sm transition btn btn-soft'
        >
          <span className='leading-none'>Detail</span>
          <FaAngleRight className='text-xs' />
        </Link>
      </div>
    </div>
  );
};

export default HistoryItem;

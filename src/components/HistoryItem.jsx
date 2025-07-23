import { FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/formatRupiah';

const HistoryItem = ({ id, type, amount, notes, transaction_date: date }) => {
  return (
    <li className='list-row bg-base-200 shadow'>
      <div className='my-auto'>
        {type === 'income' ? (
          <div className='badge badge-success'>Income</div>
        ) : (
          type === 'outcome' && <div className='badge badge-error'>Outcome</div>
        )}
      </div>
      <div>
        <h3 className='font-semibold'>{formatRupiah(amount)}</h3>
        <div className='text-xs opacity-60 line-clamp-1 sm:line-clamp-2'>
          { notes }
        </div>
        <p className='hidden'>{date.split('T')[0]}</p>
      </div>
      <div className='flex justify-end card-actions'>
        <Link
          to={`/record/${id}`}
          className='inline-flex items-center gap-1 border rounded px-2 py-1 text-base-content text-sm transition btn btn-soft'
        >
          <span className='leading-none'>Detail</span>
          <FaAngleRight className='text-xs' />
        </Link>
      </div>
    </li>
  );
};

export default HistoryItem;

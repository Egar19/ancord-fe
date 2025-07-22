import { FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/formatRupiah';

const HistoryItem = ({ id, type, amount, notes, transaction_date: date }) => {
  return (
    <div className='card card-md bg-base-300 shadow-md '>
      <div className='card-body'>
        <h2 className='capitalize text-xl card-title font-bold'>{type}</h2>
        <p>
          <strong>Amount: </strong>
          {formatRupiah(amount)}
        </p>
        <p>
          <strong>Notes: </strong>
          {notes}
        </p>
        <p>
          <strong>Date: </strong>
          {date}
        </p>
        <div className='flex justify-end card-actions'>
          <Link
            to={`/record/${id}`}
            className='inline-flex items-center gap-1 border rounded px-2 py-1 text-base-content text-sm transition btn btn-soft'
          >
            <span className='leading-none'>Detail</span>
            <FaAngleRight className='text-xs' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;

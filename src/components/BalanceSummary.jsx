import { formatRupiah } from '../utils/formatRupiah';
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const BalanceSUmmary = ({ balance, totalIncome, totalOutcome }) => {
  return (
    <div className='stats stats-vertical md:stats-horizontal shadow bg-base-200 w-full'>
      <div className='stat'>
        <div className='stat-title flex gap-0.5'>
          <RiMoneyDollarCircleLine className="text-base-content text-xl" />
          <span>Balance</span>
        </div>
        <div className='stat-value sm:text-2xl text-xl lg:text-4xl'>{formatRupiah(balance)}</div>
      </div>

      <div className='stat'>
        <div className='stat-title flex gap-0.5'>
          <HiTrendingUp className="text-success text-xl" />
          <span>Total Income </span>
        </div>
        <div className='stat-value sm:text-2xl text-xl lg:text-4xl'>
          {formatRupiah(totalIncome)}
        </div>
      </div>

      <div className='stat'>
        <div className='stat-title flex gap-0.5'>
          <HiTrendingDown className="text-error text-xl" />
          <span>Total outcome</span>
        </div>
        <div className='stat-value sm:text-2xl text-xl lg:text-4xl'>{formatRupiah(totalOutcome)}</div>
      </div>
    </div>
  );
};

export default BalanceSUmmary;

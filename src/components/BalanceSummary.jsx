import { formatRupiah } from '../utils/formatRupiah';

const BalanceSUmmary = ({ balance, totalIncome, totalOutcome }) => {
  return (
    <div className='stats stats-vertical lg:stats-horizontal shadow bg-base-200 w-full'>
      <div className='stat'>
        <div className='stat-title'>Balance: </div>
        <div className='stat-value sm:text-2xl text-xl lg:text-4xl'>{formatRupiah(balance)}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Total Income</div>
        <div className='stat-value sm:text-2xl text-xl lg:text-4xl'>{formatRupiah(totalIncome)}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Total outcome</div>
        <div className='stat-value sm:text-2xl text-xl lg:text-4xl'>{formatRupiah(totalOutcome)}</div>
      </div>
    </div>
  );
};

export default BalanceSUmmary;

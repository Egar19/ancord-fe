const BalanceSUmmary = ({balance, totalIncome, totalOutcome}) => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 p-4 bg-base-300 rounded'>
      <h3 className='text-xl'>Balance: {balance}</h3>
      <div>
        <h2>Total Income: {totalIncome}</h2>
        <h2>Total Outcome: {totalOutcome}</h2>
      </div>
    </div>
  );
};

export default BalanceSUmmary;

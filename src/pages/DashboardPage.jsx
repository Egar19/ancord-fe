import BalanceSummary from '../components/BalanceSummary';
import HistoryList from '../components/HistoryList';
import Loading from '../components/Loading';
import { useTransactions } from '../hooks/useTransactions';

const DashboardPage = () => {
  const { data: transactions = [], isLoading } = useTransactions();

  if (isLoading) return <Loading />;

  const totalIncome = transactions
    .filter((trx) => trx.type === 'income')
    .reduce((sum, trx) => sum + trx.amount, 0);

  const totalOutcome = transactions
    .filter((trx) => trx.type === 'outcome')
    .reduce((sum, trx) => sum + trx.amount, 0);

  const balance = totalIncome - totalOutcome;

  return (
    <div className='my-4'>
      <BalanceSummary
        balance={balance}
        totalIncome={totalIncome}
        totalOutcome={totalOutcome}
      />
      <HistoryList records={transactions} />
    </div>
  );
};

export default DashboardPage;

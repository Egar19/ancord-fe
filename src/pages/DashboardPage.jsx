import BalanceSUmmary from "../components/BalanceSummary"
import HistoryList from "../components/HistoryList"

const DashboardPage = ({ records, totalIncome, totalOutcome, balance, filteredRecords }) => {
  return (
    <div className="my-4">
      <BalanceSUmmary balance={balance} totalIncome={totalIncome} totalOutcome={totalOutcome}/>
      <HistoryList records={filteredRecords || records}/>
    </div>
  )
}

export default DashboardPage
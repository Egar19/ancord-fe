import BalanceSUmmary from "./BalanceSummary";
import HistoryDashboard from "./HistoryDashboard";

const TabDashboard = () => {
  return (
    <>
      <div className='tabs tabs-border'>
        <input
          type='radio'
          name='my_tabs_2'
          className='tab'
          aria-label='Dashboard'
          defaultChecked
        />
        <div className='tab-content bg-base-100 p-4'>
          <BalanceSUmmary />
          <HistoryDashboard />
        </div>

        <input
          type='radio'
          name='my_tabs_2'
          className='tab'
          aria-label='Add record'
        />
        <div className='tab-content bg-base-100 p-4'>
          Tab content 2
        </div>
      </div>
    </>
  );
};

export default TabDashboard;

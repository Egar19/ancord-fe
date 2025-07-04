import { Route, Routes } from 'react-router';
import { useState } from 'react';

import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navigation from './components/Navigation';
import { getRecords } from './utils';

const App = () => {
  const [records, setRecords] = useState(getRecords());

  const totalIncome = records
    .filter((record) => record.type === 'income')
    .reduce((acc, record) => acc + record.amount, 0);
  const totalOutcome = records
    .filter((record) => record.type === 'outcome')
    .reduce((acc, record) => acc + record.amount, 0);
  const balance = totalIncome - totalOutcome;

  return (
    <>
      <Header />
      <main className='mx-[10%]'>
        <Navigation />
        <Routes>
          <Route path='/' element={<h2>landing page</h2>} />
          <Route path='/dashboard' element={<DashboardPage records={records} balance={balance} totalIncome={totalIncome} totalOutcome={totalOutcome}/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

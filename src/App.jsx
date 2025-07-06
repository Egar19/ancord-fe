import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';

import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Navigation from './components/Navigation';
import AddRecordPage from './pages/AddRecordPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DetailPage from './pages/DetailPage';
import { getRecords } from './utils';

const App = () => {
  const location = useLocation();
  const hideNav =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  const [records, setRecords] = useState(getRecords());

  const totalIncome = records
    .filter((record) => record.type === 'income')
    .reduce((acc, record) => acc + record.amount, 0);
  const totalOutcome = records
    .filter((record) => record.type === 'outcome')
    .reduce((acc, record) => acc + record.amount, 0);
  const balance = totalIncome - totalOutcome;

  const handleAddRecord = (record) => {
    setRecords([record, ...records]);
  };

  const handleDeleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleUpdateRecord = (id, updatedData) => {
    setRecords(
      records.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
  };

  return (
    <>
      <Header />
      <main className='mx-[10%]'>
        {!hideNav && <Navigation />}
        <Routes>
          <Route path='/' element={<h2>Landing Page</h2>} />
          <Route
            path='/dashboard'
            element={
              <DashboardPage
                records={records}
                balance={balance}
                totalIncome={totalIncome}
                totalOutcome={totalOutcome}
              />
            }
          />
          <Route
            path='/addrecord'
            element={<AddRecordPage onAddRecord={handleAddRecord} />}
          />
          <Route
            path='/record/:id'
            element={
              <DetailPage
                records={records}
                onDelete={handleDeleteRecord}
                onUpdate={handleUpdateRecord}
              />
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
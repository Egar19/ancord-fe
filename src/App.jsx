import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import Header from './components/Header';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoutes';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AddRecordPage from './pages/AddRecordPage';
import UpdateRecordPage from './pages/UpdateRecordPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';

import { getTransactions, deleteTransaction } from './utils/api';
import useSearch from './hooks/useSearch';
import { useSession } from './contexts/SessionContext';

const App = () => {
  const location = useLocation();
  const { session } = useSession();

  const showNavPaths = ['/dashboard', '/addrecord', '/updaterecord'];
  const hideNav = !showNavPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const hideLogout =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  const [records, setRecords] = useState([]);

  // fetchTransactions pakai token dari session context
  const fetchTransactions = useCallback(async () => {
    try {
      const token = session?.access_token;
      if (!token) return;

      const result = await getTransactions(token);
      if (result && (result.success || result.data)) {
        const { transactions } = result.data || result;

        const sorted = [...transactions].sort(
          (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
        );

        setRecords(sorted);
      } else {
        console.log('Failed to fetch transactions. Response:', result);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [session]);

  // Trigger fetchTransactions saat session berubah (misalnya setelah login)
  useEffect(() => {
    if (session?.access_token) {
      fetchTransactions();
    }
  }, [session, fetchTransactions]);

  const { filteredRecords, setSearchQuery } = useSearch(records);

  const totalIncome = records
    .filter((record) => record.type === 'income')
    .reduce((acc, record) => acc + record.amount, 0);

  const totalOutcome = records
    .filter((record) => record.type === 'outcome')
    .reduce((acc, record) => acc + record.amount, 0);

  const balance = totalIncome - totalOutcome;

  // const handleAddRecord = (newRecord) => {
  //   setRecords([newRecord, ...records]);
  // };

  const handleDeleteRecord = async (id) => {
    try {
      const token = session?.access_token;
      if (!token) {
        console.log('No session token. Please login again.');
        return;
      }

      const result = await deleteTransaction(id, token);
      if (result.success) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        console.log(`Record with ID ${id} deleted successfully.`);
      } else {
        console.error(
          'Failed to delete transaction:',
          result.message || result
        );
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleUpdateRecord = (id, updatedData) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
  };

  const withMargin =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/addrecord') ||
    location.pathname.startsWith('/updaterecord');

  return (
    <>
      <Header showLogOut={!hideLogout} onSearch={setSearchQuery} />
      <main className={withMargin ? 'mx-[10%]' : ''}>
        {!hideNav && <Navigation />}
        <Routes>
          <Route path='/' element={<LandingPage />} />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage
                  records={records}
                  balance={balance}
                  totalIncome={totalIncome}
                  totalOutcome={totalOutcome}
                  filteredRecords={filteredRecords}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path='/addrecord'
            element={
              <ProtectedRoute>
                <AddRecordPage refetchRecords={fetchTransactions} />
              </ProtectedRoute>
            }
          />

          <Route
            path='/updaterecord/:id'
            element={
              <ProtectedRoute>
                <UpdateRecordPage
                  onUpdateRecord={handleUpdateRecord}
                  refetchRecords={fetchTransactions}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path='/record/:id'
            element={
              <ProtectedRoute>
                <DetailPage
                  records={records}
                  onDelete={handleDeleteRecord}
                  onUpdate={handleUpdateRecord}
                />
              </ProtectedRoute>
            }
          />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

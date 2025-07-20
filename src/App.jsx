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

import { getTransactions } from './utils/api';
import { supabase } from './utils/supabase';
import useSearch from './hooks/useSearch';

const App = () => {
  const location = useLocation();
  const showNavPaths = ['/dashboard', '/addrecord', '/updaterecord'];
  const hideNav = !showNavPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const hideLogout =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  const [records, setRecords] = useState([]);

  // Ekstrak fetchTransactions agar bisa digunakan ulang
  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;

      if (!token) {
        console.log('No session token. Please login again.');
        return;
      }

      const result = await getTransactions(token);
      if (result && (result.success || result.data)) {
        const { transactions } = result.data || result;
        console.log('Fetched transactions:', transactions);
        setRecords(transactions);
      } else {
        console.log('Failed to fetch transactions. Response:', result);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

  // Panggil saat pertama kali load
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const { filteredRecords, setSearchQuery } = useSearch(records);

  const totalIncome = records
    .filter((record) => record.type === 'income')
    .reduce((acc, record) => acc + record.amount, 0);
  const totalOutcome = records
    .filter((record) => record.type === 'outcome')
    .reduce((acc, record) => acc + record.amount, 0);
  const balance = totalIncome - totalOutcome;

  const handleAddRecord = (newRecord) => {
    setRecords([newRecord, ...records]);
  };

  const handleDeleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleUpdateRecord = (id, updatedData) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
  };

  const withMargin = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/addrecord') ||
    location.pathname.startsWith('/updaterecord');

  return (
    <>
      <Header showLogOut={!hideLogout} onSearch={setSearchQuery} />
      <main className={withMargin ? 'mx-[10%]' : ''}>
        {!hideNav && <Navigation />}
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/dashboard"
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
            path="/addrecord"
            element={
              <ProtectedRoute>
                <AddRecordPage onAddRecord={handleAddRecord} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/updaterecord/:id"
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
            path="/record/:id"
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

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

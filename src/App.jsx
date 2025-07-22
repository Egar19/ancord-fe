import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';

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

const App = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const showNavPaths = ['/dashboard', '/addrecord', '/updaterecord'];
  const hideNav = !showNavPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const hideLogout =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  const withMargin =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/record') ||
    location.pathname.startsWith('/addrecord') ||
    location.pathname.startsWith('/updaterecord');

  const showHeaderPaths = [
    '/',
    '/dashboard',
    '/addrecord',
    '/updaterecord',
    '/record',
  ];

  const hideHeader = !showHeaderPaths.some((path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeader && (
        <Header showLogOut={!hideLogout} onSearch={setSearchQuery} />
      )}
      <main className={withMargin ? 'mx-[10%]' : ''}>
        {!hideNav && <Navigation />}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/addrecord'
            element={
              <ProtectedRoute>
                <AddRecordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/updaterecord/:id'
            element={
              <ProtectedRoute>
                <UpdateRecordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/record/:id'
            element={
              <ProtectedRoute>
                <DetailPage />
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

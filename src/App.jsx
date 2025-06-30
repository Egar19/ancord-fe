import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<h2>landing page</h2>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App

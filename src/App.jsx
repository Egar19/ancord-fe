import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App

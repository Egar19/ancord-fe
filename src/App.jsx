import { Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
// import { getRecords } from './utils';

const App = () => {
  // const [records, setRecords] = useState(getRecords()) 

  return (
    <>
      <Header />
      <main className='mx-[10%]'>
        <Routes>
          <Route path='/' element={<h2>landing page</h2>} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

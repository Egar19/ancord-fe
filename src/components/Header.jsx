import { logOutUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Header = ({showLogOut = true}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate('/login');
  };

  return (
    <header className='mb-4 py-4 shadow-2xl flex justify-around items-center px-4 bg-warning'>
      <h1 className='text-3xl font-bold text-center'>Financial Record</h1>
      <div className='flex gap-4'>
        <h1 className='text-3xl font-bold text-center'>Username</h1>
        {showLogOut && <button className='btn btn-error bg-red-600 text-white text-2xl font-bold text-center pb-3 pt-2' onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;

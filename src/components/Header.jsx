import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';
import { IoIosLogOut } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import ThemeSwitcher from './ThemeSwitcher';

const Header = ({ showLogOut, onSearch }) => {
  const navigate = useNavigate();
  const { session, setSession } = useSession();

  const handleLogout = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) {
        console.error('Logout error:', error.message);
      } else {
        console.log('Berhasil logout Supabase');
      }
    } else {
      console.log('Tidak ada session Supabase untuk logout');
    }

    setSession(null);
    navigate('/login');
  };

  const username = session?.user?.user_metadata?.username || 'User';

  return (
    <header className='navbar bg-base-200 shadow-sm flex flex-col gap-2 md:flex-row md:items-center'>
      <div className='flex-1 flex items-center'>
        <p className='btn btn-ghost text-xl'>AnCord</p>
      </div>


      {session && (
        <div className='w-full md:w-auto md:flex-1'>
          <SearchBar onSearch={onSearch} />
        </div>
      )}

      <ThemeSwitcher />

      {session && showLogOut && (
        <div className='flex gap-2 items-center'>
          <span className='font-semibold text-lg'>
            {username}
          </span>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <FaRegCircleUser className='size-full' />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow'
            >
              <li>
                <button onClick={handleLogout} className='text-accent-content'>
                  <IoIosLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

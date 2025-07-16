import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
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

  const username = session?.user?.user_metadata?.username || '';

  return (
    <header className='navbar bg-warning shadow-md'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>AnCord</a>
      </div>
      {session && (
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <details>
                <summary>{username}</summary>
                <ul className='bg-base-100 rounded-t-none p-2'>
                  <li>
                    <button onClick={handleLogout}>
                      <IoIosLogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
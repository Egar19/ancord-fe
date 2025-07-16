import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';

const Header = ({ showLogOut = true }) => {
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
    <header className='mb-4 py-4 shadow-2xl flex justify-around items-center px-4 bg-warning'>
      <h1 className='text-3xl font-bold text-center'>AnCord</h1>
      <div className='flex gap-4'>
        <h1 className='text-3xl font-bold text-center'>{username}</h1>
        {showLogOut && (
          <button
            className='btn btn-error bg-red-600 text-white text-2xl font-bold text-center pb-3 pt-2'
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';

const Header = ({ showLogOut, onSearch, searchQuery }) => {
  const navigate = useNavigate();
  const { session, setSession } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

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
    <header className='px-[5%] bg-base-200 shadow'>
      <div className='navbar gap-2'>
        <div className='flex-1 flex items-center'>
          <button
            className='cursor-pointer font-bold text-xl'
            onClick={() => {
              if (session) {
                navigate('/dashboard');
              } else {
                navigate('/');
              }
            }}
          >
            AnCord
          </button>
        </div>

        {session && showLogOut && (
          <div className='flex'>
            <SearchBar query={searchQuery} onSearch={onSearch} />
          </div>
        )}

        <div className='md:block hidden'>
          <ThemeSwitcher />
        </div>

        {session && showLogOut ? (
          <div className='flex gap-2 items-center'>
            <span className='font-semibold text-lg md:block hidden'>
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
                className='menu menu-md dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow'
              >
                <li>
                  <span className='font-semibold md:hidden block'>
                    {username}
                  </span>
                </li>
                <li className='md:hidden block'>
                  <ThemeSwitcher />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='text-red-600 flex items-center'
                  >
                    <IoIosLogOut />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          !session && (
            <div className='dropdown dropdown-end' ref={dropdownRef}>
              <button
                className='btn btn-ghost flex items-center gap-2 cursor-pointer'
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label='Open login/register menu'
              >
                {dropdownOpen ? (
                  <FaChevronUp className='text-xl' />
                ) : (
                  <FaChevronDown className='text-xl' />
                )}
              </button>
              {dropdownOpen && (
                <ul className='menu menu-md dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow'>
                  <li>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/login');
                      }}
                      className='text-base'
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/register');
                      }}
                      className='text-base'
                    >
                      Register
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )
        )}
      </div>
    </header>
  );
};

export default Header;

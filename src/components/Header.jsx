import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';

const Header = ({ showLogOut, onSearch }) => {
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
    <header className='navbar bg-base-200 shadow-sm flex flex-col gap-2 md:flex-row md:items-center sticky top-0 z-30'>
      <div className='flex-1 flex items-center'>
        <button
          className='btn btn-ghost text-xl'
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

      {session && showLogOut && <SearchBar onSearch={onSearch} />}

      <ThemeSwitcher />

      {session && showLogOut ? (
        <div className='flex gap-2 items-center'>
          <span className='font-semibold text-lg pr-4'>{username}</span>
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
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-neutral/40 dark:border-neutral-600'
            >
              <li>
                <button
                  onClick={handleLogout}
                  className='text-red-600 text-lg flex items-center gap-2'
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
              <ul className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow border border-neutral/40 dark:border-neutral-600'>
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
    </header>
  );
};

export default Header;

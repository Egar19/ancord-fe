import { Link, useLocation } from 'react-router';

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <nav className='tabs tabs-border'>
        <Link to='/dashboard'>
          <input
            type='radio'
            name='tab'
            className='tab'
            aria-label='Dashboard'
            checked={location.pathname === '/dashboard'}
            readOnly
          />
        </Link>
        <Link to='/addrecord'>
          <input
            type='radio'
            name='addrecord'
            className='tab'
            aria-label='Add Record'
            checked={location.pathname === '/addrecord'}
            readOnly
          />
        </Link>
        <Link to='/updaterecord/27'> {/* Example ID, replace with dynamic ID as needed */}
          <input
            type='radio'
            name='updaterecord'
            className='tab'
            aria-label='Update Record'
            checked={location.pathname.startsWith('/updaterecord')}
            readOnly
          />
        </Link>
      </nav>
    </>
  );
};

export default Navigation;

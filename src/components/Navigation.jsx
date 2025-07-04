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
            aria-label='Add record'
            checked={location.pathname === '/addrecord'}
            readOnly
          />
        </Link>
      </nav>
    </>
  );
};

export default Navigation;

import { Link } from 'react-router-dom';
import ancordlogo from '../assets/ancord.svg';

const LandingPage = () => {
  return (
    <div className='hero bg-base-100 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row'>
        <img src={ancordlogo} className='max-w-sm rounded-lg shadow-2xl' />
        <div>
          <h1 className='text-5xl font-bold'>
            Record & Manage Your Finances with Ease
          </h1>
          <p className='py-6'>
            This application helps you track your income, expenses, and monitor
            your balance in real-time. Start your journey to financial wellness
            today!
          </p>
          <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start'>
            <Link to='/login' className='btn btn-primary'>
              Login
            </Link>
            <Link to='/register' className='btn btn-outline'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

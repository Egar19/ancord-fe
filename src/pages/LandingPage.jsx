import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center bg-base-300 px-4 py-10 gap-10'>
      {/* Ganti src dengan ilustrasi/hero image keuangan yang sesuai */}
      <img
        src='/public/landing-illustration.svg'
        alt='Ilustrasi aplikasi keuangan'
        className='w-64 md:w-96 mb-6 md:mb-0 drop-shadow-lg'
        loading='lazy'
      />
      <div className='max-w-xl text-center md:text-left'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 text-primary'>
          Catat & Kelola Keuanganmu Lebih Mudah
        </h1>
        <p className='text-lg md:text-xl text-base-content/80 mb-8'>
          Aplikasi ini membantu kamu mencatat pemasukan, pengeluaran, dan
          memantau saldo secara real-time. Mulai perjalanan finansial sehatmu
          sekarang!
        </p>
        <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start'>
          <Link to='/login' className='btn btn-primary btn-lg'>
            Login
          </Link>
          <Link to='/register' className='btn btn-outline btn-lg'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

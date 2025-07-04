const Header = () => {
  return (
    <header className='mb-4 py-4 shadow-2xl flex justify-around items-center px-4 bg-warning'>
      <h1 className='text-3xl font-bold text-center'>Financial Record</h1>
      <div className='flex gap-4'>
        <h1 className='text-3xl font-bold text-center'>Username</h1>
        <h1 className='text-3xl font-bold text-center'>logout</h1>
      </div>
    </header>
  );
};

export default Header;

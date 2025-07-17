import { useInput } from '../hooks/useInput';
import { Link } from 'react-router';

const LoginInput = ({ login }) => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill out this field');
    }

    login(email, password);
  };

  return (
    <form
      action=''
      className='flex justify-center'
      method='post'
      onSubmit={handleSubmit}
    >
      <fieldset className='fieldset bg-warning rounded-box w-100 p-4'>
        <legend className='fieldset-legend text-2xl font-bold'>Login</legend>

        <label className='label'>Email</label>
        <input
          type='email'
          className='input w-full'
          placeholder='Email'
          onChange={setEmail}
          value={email}
          name='email'
        />

        <label className='label'>Password</label>
        <input
          type='password'
          className='input w-full'
          placeholder='Password'
          onChange={setPassword}
          value={password}
          name='password'
        />

        <Link to="/register">
          <h1 className="underline text-info">
            Dont have any account? Register here
          </h1>
        </Link>

        <button className='btn btn-primary mt-4'>Login</button>
      </fieldset>
    </form>
  );
};

export default LoginInput;
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginInput = ({ login, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex justify-center'
      method='post'
    >
      <fieldset
        className='fieldset bg-base-300 rounded-box w-100 p-4'
        disabled={isSubmitting}
      >
        <legend className='fieldset-legend text-2xl font-bold'>Login</legend>

        <label className='label'>Email</label>
        <input
          type='email'
          className='input w-full'
          placeholder='Email'
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <label className='label'>Password</label>
        <input
          type='password'
          className='input w-full'
          placeholder='Password'
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <Link to='/register'>
          <h1 className='underline text-secondary'>
            Don't have an account? Register here
          </h1>
        </Link>

        <button
          type='submit'
          className='btn btn-primary mt-4 w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </fieldset>
    </form>
  );
};

export default LoginInput;

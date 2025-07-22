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
    <div className="h-screen flex items-center justify-center bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-md bg-base-300 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-4 border border-base-200"
        method="post"
      >
        <legend className="text-3xl font-bold text-center mb-6">Login</legend>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-lg w-full"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input input-lg w-full"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <Link to="/register" className="underline text-sm md:text-base">
            Don't have an account? Register here
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg mt-4 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginInput;

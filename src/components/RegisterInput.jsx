import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterInput = ({ register: registerUser, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Password doesn't match.");
      return;
    }

    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="mt-15 h-full flex items-center justify-center bg-transparent overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-md bg-base-300 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-4 border border-base-200"
        method="post"
      >
        <legend className="text-3xl font-bold text-center mb-6">Register</legend>

        <div>
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-lg w-full"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-lg w-full"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input input-lg w-full"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input input-lg w-full"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) =>
                val === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <Link to="/login" className="underline text-sm md:text-base">
            Already have an account? Login here
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg mt-4 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterInput;
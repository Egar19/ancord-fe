import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterInput = ({ register: registerUser }) => {
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
    <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-300 rounded-box w-100 p-4">
        <legend className="fieldset-legend text-2xl font-bold">Register</legend>

        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          {...register('password', { required: 'Password is required', minLength: 6 })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Confirm Password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (val) =>
              val === watch('password') || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}

        <Link to="/login">
          <h1 className="underline text-secondary">
            Already have an account? Login here
          </h1>
        </Link>

        <button className="btn btn-primary mt-4">Register</button>
      </fieldset>
    </form>
  );
};

export default RegisterInput;
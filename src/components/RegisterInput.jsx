import { Link } from "react-router";
import { useInput } from "../hooks/useInput";

const RegisterInput = ({ register }) => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password doesn't match.");
      return;
    }

    await register({ name, email, password });
  };

  return (
    <form action="" className="flex justify-center" onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-100 border p-4">
        <legend className="fieldset-legend text-2xl font-bold">Register</legend>

        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Name"
          value={name}
          onChange={setName}
          name="username"
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          name="email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <Link to="/login">
          <h1 className="underline text-info">
            Already have an account? Login here
          </h1>
        </Link>

        <button className="btn btn-primary mt-4">Register</button>
      </fieldset>
    </form>
  );
};

export default RegisterInput;

import RegisterInput from "../components/RegisterInput"
import { registerUser } from "../utils/api"

const RegisterPage = () => {
  const handleRegister = async ({ name, email, password }) => {
    const result = await registerUser(email, password, name);
    if (result.status === 'success') {
      window.location.href = '/login';
    } else {
      alert(result.message || 'Registration failed');
    }
  };
  return (
    <RegisterInput register={handleRegister} />
  )
}

export default RegisterPage
import LoginInput from '../components/LoginInput';
import { loginUser } from '../utils/api';

const LoginPage = () => {
  const handleLogin = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.status === 'success' && result.data.session?.access_token) {
      localStorage.setItem('token', result.data.session.access_token);
      window.location.href = '/dashboard';
    } else {
      alert(result.message || 'Login Failed');
    }
  };
  return <LoginInput login={handleLogin} />;
};

export default LoginPage;
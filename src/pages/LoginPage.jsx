import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { loginUser } from '../utils/api';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setSession } = useSession();

const handleLogin = async (email, password) => {
  const result = await loginUser(email, password);
  const { access_token, refresh_token } = result.data.session || {};

  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token }); 

    setSession(result.data.session);
    navigate('/dashboard');
  } else {
    alert('Login failed');
  }
};

  return <LoginInput login={handleLogin} />;
};

export default LoginPage;
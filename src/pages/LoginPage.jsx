import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginInput from '../components/LoginInput';
import AlertBox from '../components/AlertBox';
import { loginUser } from '../utils/api';
import { supabase } from '../utils/supabase';
import { useSession } from '../contexts/SessionContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setSession } = useSession();

  const [alert, setAlert] = useState({ type: '', message: '' });

  const showAlert = (type, message, duration = 2500) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, duration);
  };

  const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);

      const session = result?.data?.session;
      const access_token = session?.access_token;
      const refresh_token = session?.refresh_token;

      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
        setSession(session);
        showAlert('success', 'Login successful');
        setTimeout(() => {
          navigate('/dashboard');
        },1000)
      } else {
        showAlert('error', 'Login failed: Invalid email or password');
      }
    } catch (error) {
      const errorMessage =
        error?.message || 'Login failed: Something went wrong';
      showAlert('error', errorMessage);
    }
  };

  return (
    <>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({})}
        />
      )}

      <LoginInput login={handleLogin} />
    </>
  );
};

export default LoginPage;

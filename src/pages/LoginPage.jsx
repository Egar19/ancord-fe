import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { loginUser } from '../utils/api';
import { supabase } from '../utils/supabase';
import AlertBox from '../components/AlertBox';
import { useSession } from '../contexts/SessionContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setSession } = useSession();

  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showAlert = (type, message, duration = 3000) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, duration);
  };

  const handleLogin = async (email, password) => {
    setIsSubmitting(true); // ⛔️ Mulai disable
    try {
      const result = await loginUser(email, password);
      const session = result?.data?.session;

      if (session?.access_token && session?.refresh_token) {
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });

        setSession(session);
        navigate('/dashboard');
      } else {
        showAlert('error', result?.message || 'Login failed.');
      }
    } catch (err) {
      showAlert('error', err?.message || 'Unexpected error occurred.');
    } finally {
      setIsSubmitting(false); // ✅ Enable lagi
    }
  };

  return (
    <>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />
      )}
      <LoginInput login={handleLogin} isSubmitting={isSubmitting} />
    </>
  );
};

export default LoginPage;

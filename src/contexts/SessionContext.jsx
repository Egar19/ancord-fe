import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'; // Supabase SDK

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session || null);
      setIsLoading(false);
    };

    getSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
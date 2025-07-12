import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../utils/supabase";


const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Cek session dari localStorage atau API
    const checkSession = async () => {
      const userSession = await getSession();
      setSession(userSession);
    };
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
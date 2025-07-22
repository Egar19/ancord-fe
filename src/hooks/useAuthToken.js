import { useSession } from '../contexts/SessionContext';

export function useAuthToken() {
  const { session } = useSession();
  return session?.access_token;
}
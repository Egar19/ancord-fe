import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../utils/api';
import { useAuthToken } from './useAuthToken';

export function useTransactions() {
  const token = useAuthToken();

  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(token).then(res => res.data.transactions),
    enabled: !!token,
  });
}
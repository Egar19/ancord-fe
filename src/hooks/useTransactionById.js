import { useQuery } from '@tanstack/react-query';
import { getTransactionById } from '../utils/api';
import { useAuthToken } from './useAuthToken';

export function useTransactionById(id) {
  const token = useAuthToken();

  return useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const res = await getTransactionById(id, token);

      if (!res.status || res.status !== 'success') {
        throw new Error(res.message || 'Failed to fetch transaction');
      }

      return res.data?.transactions;
    },
    enabled: !!id && !!token,
  });
}


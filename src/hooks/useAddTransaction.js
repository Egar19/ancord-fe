import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTransaction } from '../utils/api';
import { useAuthToken } from './useAuthToken';

export function useAddTransaction(options = {}) {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      addTransaction(data, token).then((res) => {
        if (res.status !== 'success') throw new Error(res.message || 'Failed to add');
        return res.data;
      }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      if (options.onSuccess) options.onSuccess(...args);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransaction } from '../utils/api';
import { useAuthToken } from './useAuthToken';

export function useUpdateTransaction(options = {}) {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTransaction(id, data, token),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      if (options.onSuccess) options.onSuccess(...args);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
  });
}

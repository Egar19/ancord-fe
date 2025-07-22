import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransaction } from '../utils/api';
import { useAuthToken } from './useAuthToken';

export function useUpdateTransaction() {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTransaction(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
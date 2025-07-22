import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '../utils/api';
import { useAuthToken } from './useAuthToken';

export function useDeleteTransaction() {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTransaction(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
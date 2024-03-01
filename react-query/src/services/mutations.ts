import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, updateTodo } from './api';
import { Todo } from '../types/todo';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => console.log('Mutating'),

    onError: () => console.log('erororororoor'),

    onSuccess: () => console.log('success'),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['todos'],
        });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['todos'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['todo', { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['todos'],
        });
      }
    },
  });
}

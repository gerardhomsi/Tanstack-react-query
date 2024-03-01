import { SubmitHandler, useForm } from 'react-hook-form';
import { useTodos, useTodosIds } from '../services/queries';
import { Todo } from '../types/todo';
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutations';
// import { useState } from 'react';

const Todos = () => {
  const { data } = useTodosIds();

  const todosQuery = useTodos(data);

  const { register, handleSubmit, reset } = useForm<Todo>();

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
    reset();
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };
  const handleMarkAsUnDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: false });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo</h4>
        <input
          placeholder='Title'
          {...register('title')}
        />
        <input
          placeholder='Description'
          {...register('description')}
        />
        <input
          type='submit'
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create Todo'}
        />
      </form>
      <ul>
        {todosQuery.map(({ data }) => (
          <li
            key={data?.id}
            style={{ display: 'flex', gap: '10px' }}
          >
            <h2>{data?.title}</h2>
            <h3>{data?.description}</h3>
            <h3>{data?.id}</h3>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? 'Done' : 'Mark As Done'}
              </button>
              <button
                onClick={() => handleMarkAsUnDoneSubmit(data)}
                disabled={data?.checked === false}
              >
                unCheck
              </button>
              {data && data?.id && (
                <button
                  onClick={() => handleDeleteTodo(data.id!)}
                  disabled={deleteTodoMutation.isPending}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;

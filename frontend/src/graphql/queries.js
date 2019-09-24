import { execPromise } from './init';

import { TODOES_QUERY } from './todoOperations';
import { ME_QUERY } from './signOperations';

import todoStore from '../stores/todos-store';

const getTodos = async (first, skip = 0) => {
  const todos = await execPromise({
    query: TODOES_QUERY,
    variables: { first, skip }
  });
  if (todos && todos.data && todos.data.todoes) {
    todoStore.setTodos({
      todos: todos.data.todoes,
      totalTodos: todos.data.todoesConnection.aggregate.count
    });
    return todos.data;
  } else {
    todoStore.resetTodos();
    if (todos.errors) {
      throw new Error(todos.errors[0].message);
    }
    return { todos: [], totalTodos: 0 };
  }
};

const me = async () => {
  const meData = await execPromise({
    query: ME_QUERY
  });
  if (meData && meData.data && meData.data.me) {
    return meData.data.me;
  } else {
    if (meData.errors) {
      throw new Error(meData.errors[0].message);
    }
    return null;
  }
};

export { getTodos, me };

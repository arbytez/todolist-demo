import { writable } from 'svelte/store';

const todoStore = writable({ todos: [], totalTodos: 0 });

const customTodoStore = {
  subscribe: todoStore.subscribe,
  setTodos: todosData => {
    todoStore.set(todosData);
  },
  resetTodos: () => {
    todoStore.update(() => {
      return { todos: [], totalTodos: 0 };
    });
  },
  addTodo: todoData => {
    const newTodo = {
      ...todoData
    };
    todoStore.update(items => {
      return {
        todos: [...items.todos, newTodo],
        totalTodos: items.totalTodos + 1
      };
    });
  },
  updateTodo: (id, todoData) => {
    todoStore.update(items => {
      const todoIndex = items.todos.findIndex(i => i.id === id);
      const updatedTodo = { ...items.todos[todoIndex], ...todoData };
      const updatedTodos = [...items.todos];
      updatedTodos[todoIndex] = updatedTodo;
      return { todos: updatedTodos, totalTodos: items.totalTodos };
    });
  },
  removeTodo: id => {
    todoStore.update(items => {
      const newTodos = items.todos.filter(i => i.id !== id);
      const newTotalTodos =
        items.todos.length !== newTodos.length
          ? items.totalTodos - 1
          : items.totalTodos;
      return { todos: newTodos, totalTodos: newTotalTodos };
    });
  }
};

export default customTodoStore;

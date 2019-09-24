import { exec } from './init';
import loggedStore from '../stores/logged-store';
import todosStore from '../stores/todos-store';

import { TODO_SUBSCRIPTION } from './todoOperations';

const todoSub = () => {
  try {
    const cb = {
      next: receivedData => {
        if (receivedData && receivedData.data && receivedData.data.todo) {
          const {
            mutation,
            node,
            previousValues,
            updatedFields
          } = receivedData.data.todo;
          switch (mutation) {
            case 'CREATED':
              todosStore.addTodo(node);
              break;
            case 'UPDATED':
              todosStore.updateTodo(node.id, node);
              break;
            case 'DELETED':
              todosStore.removeTodo(previousValues.id);
              break;
            default:
              break;
          }
        }
      },
      error: error => console.error(error)
      //   complete: () => console.log(`subscription complete`)
    };
    const obs = exec({ query: TODO_SUBSCRIPTION });
    const uns = obs.subscribe(cb);
    return uns;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { todoSub };

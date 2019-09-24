import { execPromise } from './init';
import loggedStore from '../stores/logged-store';
import todosStore from '../stores/todos-store';

import {
  CREATETODO_MUTATION,
  DELETETODO_MUTATION,
  UPDATETODO_MUTATION
} from './todoOperations';
import {
  SIGNUP_MUTATION,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION
} from './signOperations';

const signUp = async (username, password) => {
  const signUpData = await execPromise({
    query: SIGNUP_MUTATION,
    variables: { username, password }
  });
  if (signUpData && signUpData.data && signUpData.data.signUp) {
    loggedStore.setLogged({
      isLogged: true,
      username: signUpData.data.signUp.user.username,
      roles: signUpData.data.signUp.user.roles,
      token: signUpData.data.signUp.token
    });
    return signUpData.data.signUp;
  } else {
    if (signUpData.errors) {
      throw new Error(signUpData.errors[0].message);
    }
    return null;
  }
};

const signIn = async (username, password) => {
  const signInData = await execPromise({
    query: SIGNIN_MUTATION,
    variables: { username, password }
  });
  if (signInData && signInData.data && signInData.data.signIn) {
    loggedStore.setLogged({
      isLogged: true,
      username: signInData.data.signIn.user.username,
      roles: signInData.data.signIn.user.roles,
      token: signInData.data.signIn.token
    });
    return signInData.data.signIn;
  } else {
    if (signInData.errors) {
      throw new Error(signInData.errors[0].message);
    }
    return null;
  }
};

const signOut = async () => {
  const signOutData = await execPromise({
    query: SIGNOUT_MUTATION
  });
  if (signOutData && signOutData.data && signOutData.data.signOut) {
    loggedStore.resetLogged();
    return signOutData.data.signOut;
  } else {
    if (signOutData.errors) {
      throw new Error(signOutData.errors[0].message);
    }
    return false;
  }
};

const addTodo = async (content, done = false, username) => {
  const todoData = await execPromise({
    query: CREATETODO_MUTATION,
    variables: { content, done, username }
  });
  if (todoData && todoData.data && todoData.data.createTodo) {
    // todosStore.addTodo({
    //   ...todoData.data.createTodo
    // });
    return todoData.data.createTodo;
  } else {
    if (todoData.errors) {
      throw new Error(todoData.errors[0].message);
    }
    return null;
  }
};

const deleteTodo = async id => {
  const todoData = await execPromise({
    query: DELETETODO_MUTATION,
    variables: { id }
  });
  if (todoData && todoData.data && todoData.data.deleteTodo) {
    todosStore.removeTodo(todoData.data.deleteTodo.id);
    return todoData.data.deleteTodo;
  } else {
    if (todoData.errors) {
      throw new Error(todoData.errors[0].message);
    }
    return null;
  }
};

const updateTodo = async todo => {
  const todoData = await execPromise({
    query: UPDATETODO_MUTATION,
    variables: { id: todo.id, content: todo.content, done: todo.done }
  });
  if (todoData && todoData.data && todoData.data.updateTodo) {
    todosStore.updateTodo(todo.id, todo);
    return todoData.data.updateTodo;
  } else {
    if (todoData.errors) {
      throw new Error(todoData.errors[0].message);
    }
    return null;
  }
};

export { signIn, signOut, signUp, addTodo, deleteTodo, updateTodo };

import { writable } from 'svelte/store';

const loggedStore = writable({
  isLogged: false,
  username: '',
  roles: [],
  token: ''
});

const customLoggedStore = {
  subscribe: loggedStore.subscribe,
  setLogged: loggedData => {
    loggedStore.set(loggedData);
  },
  resetLogged: () => {
    loggedStore.update(() => {
      return { isLogged: false, username: '', roles: [], token: '' };
    });
  }
};

export default customLoggedStore;

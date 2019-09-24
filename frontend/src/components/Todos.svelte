<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    afterUpdate
  } from 'svelte';

  import Todo from './Todo.svelte';
  import todosStore from '../stores/todos-store';
  import loggedStore from '../stores/logged-store';
  import { getTodos } from '../graphql/queries';
  import { addTodo, deleteTodo, updateTodo } from '../graphql/mutations';
  import { todoSub } from '../graphql/subscriptions';
  import AddTodo from './AddTodo.svelte';
  import Loader from './Loader.svelte';
  import Error from './Error.svelte';

  let loading = true;
  let todos = [];
  let msgError = '';
  let uns;

  onMount(async () => {
    feather.replace();
    await handleGetTodos();
    uns = todoSub();
  });

  afterUpdate(() => {
    feather.replace();
  });

  onDestroy(() => {
    if (uns && uns.unsubscribe) {
      uns.unsubscribe();
    }
  });

  async function handleGetTodos() {
    try {
      loading = true;
      msgError = '';
      await getTodos();
    } catch (error) {
      msgError = error.message;
    } finally {
      loading = false;
    }
  }

  async function handleAddTodo(e) {
    try {
      loading = true;
      msgError = '';
      const todoData = e.detail;
      await addTodo(todoData, false, $loggedStore.username);
    } catch (error) {
      msgError = error.message;
    } finally {
      loading = false;
    }
  }

  async function handleRemoveTodo(e) {
    try {
      loading = true;
      msgError = '';
      const todoIdToRemove = e.detail;
      await deleteTodo(todoIdToRemove);
    } catch (error) {
      msgError = error.message;
    } finally {
      loading = false;
    }
  }

  async function handleUpdateTodo(e) {
    try {
      msgError = '';
      loading = true;
      const todoToUpdate = e.detail;
      await updateTodo(todoToUpdate);
    } catch (error) {
      msgError = error.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex justify-between items-center">
  <h2 class="text-lg text-white text-center">
    Todos ({$todosStore.totalTodos})
  </h2>
  {#if loading}
    <Loader />
  {/if}
  <button
    disabled={loading}
    class="p-2 rounded text-white focus:outline-none hover:bg-oxfordblue"
    on:click={handleGetTodos}>
    <i data-feather="repeat" />
  </button>
</div>

{#if $loggedStore.isLogged}
  <div class="mt-2 mb-4">
    <AddTodo on:addtodo={handleAddTodo} />
  </div>
{/if}

<div class="w-full">
  <Error msg={msgError} />
</div>

{#each $todosStore.todos as todo (todo.id)}
  <Todo
    {todo}
    on:removetodo={handleRemoveTodo}
    on:updatetodo={handleUpdateTodo} />
{:else}
  <p class="text-center">No todos found!</p>
{/each}

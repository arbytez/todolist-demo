<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { distanceInWordsToNow, format } from 'date-fns';

  import loggedStore from '../stores/logged-store';

  export let todo;

  const dispatch = createEventDispatcher();

  let modify = false,
    initialTodoContent = '',
    inputEl,
    divTodoEl,
    btnCheckEl,
    btnUncheckEl,
    btnEditEl,
    btnRemoveEl;

  $: isOwner = $loggedStore.username === todo.user.username;

  onMount(() => {
    feather.replace();
    initialTodoContent = todo.content;
    if (!$loggedStore.isLogged || !isOwner) {
      disableEl(divTodoEl);
      disableEl(inputEl);
      disableEl(btnCheckEl);
      disableEl(btnUncheckEl);
      disableEl(btnEditEl);
      disableEl(btnRemoveEl);
    }
    if ($loggedStore.isLogged && $loggedStore.roles.includes('ADMIN')) {
      enableEl(divTodoEl);
      enableEl(inputEl);
      enableEl(btnCheckEl);
      enableEl(btnUncheckEl);
      enableEl(btnEditEl);
      enableEl(btnRemoveEl);
    }
  });

  function enableEl(el) {
    if (el) {
      el.disabled = false;
      el.readonly = false;
      el.classList.remove('cursor-not-allowed');
    }
  }

  function disableEl(el) {
    if (el) {
      el.disabled = true;
      el.readonly = true;
      el.classList.add('cursor-not-allowed');
    }
  }

  function handleRemoveTodo() {
    dispatch('removetodo', todo.id);
  }

  function handleCheckTodo() {
    todo.done = !todo.done;
    initialTodoContent = todo.content;
    dispatch('updatetodo', todo);
  }

  function handleUpdateTodo() {
    if (todo.content && initialTodoContent !== todo.content) {
      initialTodoContent = todo.content;
      todo.updatedAt = new Date().toUTCString();
      dispatch('updatetodo', todo);
    }
  }
</script>

<style>

</style>

<div
  bind:this={divTodoEl}
  class={`rounded text-white my-4 pb-2 pl-2 ${todo.done ? 'bg-nepal' : 'bg-oxfordblue'}`}>
  <p class={`text-xs italic ${todo.done ? 'text-mirage' : 'text-nepal'}`}>
    updated on {format(todo.updatedAt, 'DD/MM/YYYY')} at {format(todo.updatedAt, 'HH:mm:ss')}
    user
    <span class={`font-bold ${isOwner ? 'text-white' : ''}`}>
      {todo.user.username}
    </span>
    {`${todo.done ? '(completed)' : '(not completed)'}`}
  </p>
  <div class="flex justify-between items-center">
    {#if $loggedStore.isLogged}
      <button
        bind:this={btnCheckEl}
        class="p-3 hover:bg-ebonyclay rounded"
        on:click={handleCheckTodo}
        hidden={todo.done}>
        <i data-feather="check" />
      </button>
      <button
        bind:this={btnUncheckEl}
        class="p-3 mx-1 hover:bg-ebonyclay rounded"
        on:click={handleCheckTodo}
        hidden={!todo.done}>
        <i data-feather="x" />
      </button>
    {/if}
    <input
      name="Todo content"
      class={`w-full mx-2 mt-2 focus:outline-none px-2 overflow-x-auto overflow-scroll
      rounded ${todo.done ? 'bg-nepal focus:bg-regent line-through' : 'bg-oxfordblue focus:bg-ebonyclay2'}`}
      bind:value={todo.content}
      bind:this={inputEl} />
    {#if $loggedStore.isLogged}
      <button
        bind:this={btnEditEl}
        class="p-3 mx-1 hover:bg-ebonyclay rounded"
        on:click={handleUpdateTodo}>
        <i data-feather="edit-2" />
      </button>
      <button
        bind:this={btnRemoveEl}
        class="p-3 mx-1 hover:bg-ebonyclay rounded"
        on:click={handleRemoveTodo}>
        <i data-feather="trash-2" />
      </button>
    {/if}
  </div>
</div>

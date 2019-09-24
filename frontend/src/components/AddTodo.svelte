<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();

  let todoValue;

  onMount(() => {
    feather.replace();
  });

  function handleAddTodo() {
    if (todoValue) {
      dispatch('addtodo', todoValue);
    }
  }
</script>

<form class="w-full" on:submit|preventDefault={handleAddTodo}>
  <div class="flex items-center border-b border-b-2 border-azureradiance py-2">
    <input
      class="appearance-none bg-ebonyclay focus:bg-ebonyclay2 border-none w-full
      text-white mr-3 p-4 leading-tight focus:outline-none"
      type="text"
      placeholder="Enter a new todo"
      bind:value={todoValue}
      aria-label="New Todo" />
    <button
      class="flex-shrink-0 bg-azureradiance hover:bg-dodgerblue
      border-azureradiance hover:border-dodgerblue text-lg border-4 text-white
      px-4 py-2 rounded"
      type="submit">
      <i data-feather="plus" />
    </button>
  </div>
</form>

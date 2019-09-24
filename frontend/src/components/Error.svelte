<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let msg = '';

  onMount(async () => {
    feather.replace();
  });
</script>

{#if msg}
  <div
    class="p-2 m-2 flex justify-between items-center rounded bg-cinnabar
    text-white">
    <i data-feather="alert-triangle" />
    <p class="font-bold px-2">{msg}</p>
  </div>
{/if}

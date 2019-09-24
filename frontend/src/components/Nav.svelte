<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import loggedStore from '../stores/logged-store';

  const dispatch = createEventDispatcher();
</script>

<div
  class="bg-oxfordblue text-athensgray p-4 text-xl flex justify-between
  items-center flex-wrap flex-grow">
  <div
    class="tracking-wide cursor-pointer hover:text-nepal px-4"
    on:click={() => {
      dispatch('logo');
    }}>
    Todo List Demo
  </div>
  {#if $loggedStore.isLogged}
    <p class="px-4 text-base">
      Welcome,
      <span class="text-regent italic">{$loggedStore.username}</span>
    </p>
    <button
      class="px-4 text-base hover:text-nepal focus:outline-none hover:underline"
      on:click={() => {
        dispatch('signout');
      }}>
      Sign Out
    </button>
  {:else}
    <p class="px-4 text-base">Not logged in</p>
    <button
      class="px-4 hover:text-nepal focus:outline-none hover:underline text-base"
      on:click={() => {
        dispatch('signforms');
      }}>
      Sign In / Sign Up
    </button>
  {/if}
</div>

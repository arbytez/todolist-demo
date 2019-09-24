<script>
  import { createEventDispatcher } from 'svelte';

  export let disabled = false;

  const dispatch = createEventDispatcher();

  let username = '',
    password = '';

  function handleSignIn() {
    dispatch('signin', { username, password });
  }
</script>

<style>

</style>

<h2 class="text-lg mb-4 pb-4 pl-2 border-b border-regent">Sign In</h2>
<form
  class="md:w-full max-w-sm px-4 mt-4"
  on:submit|preventDefault={handleSignIn}>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label
        class="block text-regent font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="signin-username">
        Username
      </label>
    </div>
    <div class="md:w-2/3">
      <input
        class="text-white appearance-none bg-ebonyclay border border-ebonyclay
        rounded w-full py-2 px-4 leading-tight focus:outline-none focus:border
        focus:border-azureradiance"
        id="signin-username"
        type="text"
        placeholder="Enter your username"
        bind:value={username} />
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label
        class="block text-regent font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="signin-password">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input
        class="text-white appearance-none bg-ebonyclay border border-ebonyclay
        rounded w-full py-2 px-4 leading-tight focus:outline-none focus:border
        focus:border-azureradiance"
        id="signin-password"
        type="password"
        placeholder="******************"
        bind:value={password} />
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3" />
    <div class="md:w-2/3">
      <button
        class="shadow bg-ebonyclay hover:bg-ebonyclay2 focus:shadow-outline
        focus:outline-none text-white font-bold py-2 px-4 rounded"
        {disabled}
        type="submit">
        Sign In
      </button>
    </div>
  </div>
</form>

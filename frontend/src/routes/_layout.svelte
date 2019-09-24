<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    afterUpdate
  } from 'svelte';

  import Nav from '../components/Nav.svelte';
  import SignIn from '../components/SignIn.svelte';
  import SignUp from '../components/SignUp.svelte';
  import Loader from '../components/Loader.svelte';
  import Error from '../components/Error.svelte';
  import { signIn, signOut, signUp } from '../graphql/mutations';
  import { me } from '../graphql/queries';
  import loggedStore from '../stores/logged-store';

  export let segment;

  let showSignForms = false,
    loadingComp = true,
    loadingSignIn = false,
    loadingSignUp = false,
    msgErrorSignIn = '',
    msgErrorSignUp = '';

  onMount(async () => {
    try {
      loadingComp = true;
      loggedStore.resetLogged();
      const meData = await me();
      if (meData) {
        loggedStore.setLogged({
          isLogged: true,
          username: meData.user.username,
          roles: meData.user.roles,
          token: meData.token
        });
      } else {
        loggedStore.resetLogged();
      }
    } catch (error) {
    } finally {
      loadingComp = false;
    }
  });

  afterUpdate(() => {
    feather.replace();
  });

  async function handleSignUp(e) {
    try {
      loadingSignUp = true;
      msgErrorSignUp = '';
      msgErrorSignIn = '';
      const { username, password, confirmPassword } = e.detail;
      if (!username) {
        msgErrorSignUp = 'No username specified';
        return;
      }
      if (!password) {
        msgErrorSignUp = 'No password specified';
        return;
      }
      if (password !== confirmPassword) {
        msgErrorSignUp = 'Wrong confirm password';
        return;
      }
      if (await signUp(username, password)) {
        showSignForms = false;
      }
    } catch (error) {
      msgErrorSignUp = error.message;
    } finally {
      loadingSignUp = false;
    }
  }

  async function handleSignIn(e) {
    try {
      loadingSignIn = true;
      msgErrorSignIn = '';
      msgErrorSignUp = '';
      const { username, password } = e.detail;
      if (!username) {
        msgErrorSignIn = 'No username specified';
        return;
      }
      if (!password) {
        msgErrorSignIn = 'No password specified';
        return;
      }
      if (await signIn(username, password)) {
        showSignForms = false;
      }
    } catch (error) {
      msgErrorSignIn = error.message;
    } finally {
      loadingSignIn = false;
    }
  }
</script>

{#if !loadingComp}
  <Nav
    on:signforms={() => {
      showSignForms = true;
    }}
    on:logo={() => {
      showSignForms = false;
    }}
    on:signout={async () => {
      await signOut();
      showSignForms = true;
    }} />

  <div class="container mx-auto text-regent">
    {#if showSignForms}
      <div class="md:flex md:justify-around">
        <div class="bg-oxfordblue rounded py-4 m-4">
          {#if loadingSignIn}
            <Loader />
          {/if}
          <SignIn on:signin={handleSignIn} disabled={loadingSignIn} />
          <Error msg={msgErrorSignIn} />
        </div>
        <div class="bg-oxfordblue rounded py-4 m-4">
          {#if loadingSignUp}
            <Loader />
          {/if}
          <SignUp on:signup={handleSignUp} disabled={loadingSignUp} />
          <Error msg={msgErrorSignUp} />
        </div>
      </div>
    {:else}
      <slot />
    {/if}
  </div>
{:else}
  <div class="flex justify-center items-center h-screen w-screen text-white">
    <Loader />
  </div>
{/if}

<script lang="ts">
  import { onMount } from 'svelte'
  import { initializeGoogleAccounts, renderGoogleButton } from '$lib/google'

  let message: string
  
  onMount(() => {
    initializeGoogleAccounts()
    renderGoogleButton()
	})
  
</script>

<svelte:head>
  <title>Login Form</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

<div class="container">
  <div id="googleButton"></div>
</div>

<style>
  #googleButton {
    display: grid;
    place-content: center;
  }
</style>
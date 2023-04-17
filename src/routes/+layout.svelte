<script lang="ts">
  import Topbar from '$lib/Topbar.svelte';
  import Footer from '$lib/Footer.svelte';
  import type { LayoutServerData } from './$types';
  import { onMount } from 'svelte';
  import { goto, beforeNavigate } from '$app/navigation';
  import { loginSession } from '../stores';
  import { initializeGoogleAccounts } from '$lib/google';
  
  export let data: LayoutServerData
  
  // If returning from different website, runs once (as it's an SPA) to restore user session if session cookie is still valid
  const { user } = data
  $loginSession = user
  
  beforeNavigate( () => {
		let expirationDate = $loginSession?.expires ? new Date($loginSession.expires) : undefined
		if (expirationDate && expirationDate < new Date()) {
			console.log('Login session expired.')
			$loginSession = null
		}
	})

  onMount(async () => {
    initializeGoogleAccounts()
    if (!$loginSession) google.accounts.id.prompt()
	})
  
</script>

<div class="app">
  <Topbar />
	<main><slot /></main>
  <Footer />
</div>
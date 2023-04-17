<script lang="ts">
  import Topbar from '$lib/Topbar.svelte';
  import Footer from '$lib/Footer.svelte';
  import type { LayoutServerData } from './$types'
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
  async function logout() {
  		// Request server delete httpOnly cookie called loginSession
  		const url = '/auth/logout'
  		const res = await fetch(url, {
  			method: 'POST'
  		})
  		if (res.ok) {
  			loginSession.set(undefined) // delete loginSession.user from
  			goto('/login')
  		} else console.error(`Logout not successful: ${res.statusText} (${res.status})`)
  	}
</script>

<div class="app">
	{#if $loginSession}
    <li class="nav-item"><a class="nav-link" href="/admin">Admin</a></li>
  {/if}
  <Topbar />
	<main><slot /></main>
  <Footer />
  
</div>
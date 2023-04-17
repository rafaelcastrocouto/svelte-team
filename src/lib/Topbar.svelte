<script>
  import { page } from '$app/stores';
  import { loginSession } from '../stores';
</script>

<div class="topbar">
  
  <a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Home</a> 
  
	{#if $loginSession}
    <a href="/logout">Logout</a> 
    <a href="/admin" aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}>Admin</a>
  {:else}
    <a href="/login" aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>Login</a>
  {/if}
  
</div>

<style>
  .topbar {
    position: absolute;
    right: 1rem;
    top: 0.5rem;
  }
  a[aria-current='page'] {
    text-decoration: underline;
  }
</style>

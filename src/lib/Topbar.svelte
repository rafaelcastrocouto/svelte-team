<script>
  import { page } from '$app/stores';
</script>

<div class="topbar">
  <a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Home</a> 
  <a href="/login" aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>Login</a> 
  <!--a href="/register" aria-current={$page.url.pathname === '/register' ? 'page' : undefined}>Register</a-->
  
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

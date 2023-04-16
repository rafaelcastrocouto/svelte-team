<script>
  import Topbar from '$lib/Topbar.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<div class="app">
	
  <Topbar />
	<main><slot /></main>
  <Footer />
  
</div>
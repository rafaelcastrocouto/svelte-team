<script>
  import logo from './assets/weird.png'
  import svelte from './assets/svelte.png'
  import Counter from './lib/Team.svelte'
  import Github from './lib/server/Github.svelte'
</script>

<main>
  <img src={logo} alt="Weird Logo" class="logo_img"/>
  <h1>Weird Team!</h1>

  <Github />
  
  <!-- Counter /-->

  <p class="footer">
    Made with  <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>, also powered by <a href="https://vitejs.dev/" target="_blank"></a>Vite!
  </p>
  
  <a href="https://svelte.dev" target="_blank"><img src={svelte} alt="Svelte Logo" class="footer_img"/></a>
  
  <p>
     Visit <a href="https://svelte.dev" target="_blank">svelte.dev</a> to learn how to build Svelte apps.
  </p>

  
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 30rem;
  }

  .logo_img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: var(--orange);
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 0;
    margin-bottom: 2rem;
  }

  p {
    margin: 1rem auto;
    line-height: 1.35;
  }

  .footer {
    margin-top: 4em;
  }

  .footer_img {
    height: 6rem;
    width: 6rem;
  }

</style>

<script>
  import svelte from '../assets/svelte.png';
</script>

<p class="footer">
  Made with  <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>, also powered by <a href="https://vitejs.dev/" target="_blank"></a>Vite!
</p>

<a href="https://svelte.dev" target="_blank"><img src={svelte} alt="Svelte Logo" class="footer_img"/></a>

<p>
   Visit <a href="https://svelte.dev" target="_blank">svelte.dev</a> to learn how to build Svelte apps.
</p>


<style>

  .footer {
    margin-top: 5em;
  }

  .footer_img {
    height: 6rem;
    width: 6rem;
  }

</style>
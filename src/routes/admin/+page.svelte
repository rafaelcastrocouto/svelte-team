<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

  const users = Object.values(data.users)
  const mails = Object.keys(data.users)

</script>

<svelte:head>
  <title>Administration</title>
</svelte:head>

<h4>Administration</h4>

<div>
  {#each users as u, i}
    <p>{u.role}: {u.user} (<a href="mailto:{mails[i]}">{mails[i]}</a>)</p>
  {/each}
</div>

<h4>Organizations</h4>

<div>  
  {#each data.orgs as org} 
    <p>{org} (<a href="https://github.com/{org}">Github</a>)</p>
  {/each}
</div>
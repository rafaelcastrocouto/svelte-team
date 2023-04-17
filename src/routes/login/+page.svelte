<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { loginSession } from '../../stores'
  import { initializeGoogleAccounts, renderGoogleButton } from '$lib/google'

  let message: string
  const credentials: Credentials = {
    email: '',
    password: ''
  }
  
  async function login() {
    message = ''
    const form = <HTMLFormElement> document.getElementById('signIn')
    if (form.checkValidity()) {
      try {
        await loginLocal(credentials)
      } catch (err) {
        if (err instanceof Error) {
          console.error('Login error', err.message)
          message = err.message
        }
      }
    } else {
      form.classList.add('was-validated')
      //focusOnFirstError(form)
    }
  }
  
  onMount(() => {
    initializeGoogleAccounts()
    renderGoogleButton()
	})
  
</script>

<svelte:head>
  <title>Login Form</title>
  <meta name='robots' content='noindex, nofollow'/>
</svelte:head>

<div id="googleButton"></div>


<style>

  #googleButton {
    display: grid;
    place-content: center;
  }

</style>
<script>
import { loginSession } from '../../stores';
import { goto, afterNavigate } from '$app/navigation'
  
async function logout() {
  // Request server delete httpOnly cookie called loginSession
  const url = '/auth/logout'
  const res = await fetch(url, {
    method: 'POST'
  })
  if (res.ok) {
    loginSession.set(undefined) // delete loginSession.user from)
    goto('/')
  } else {
    console.error(`Logout not successful: ${res.statusText} (${res.status})`)
  }
}

afterNavigate( () => { logout() })
  
</script>

<svelte:head>
  <title>Logout</title>
</svelte:head>

<h4>Logging out</h4>
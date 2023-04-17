import type { Handle, RequestEvent} from '@sveltejs/kit'
import { config } from '$lib/config.js'

async function attachUserToRequestEvent(sessionId: string, event: RequestEvent) {
  let user
  for (let mail in config.users) {
    if ( config.users[mail].token == sessionId) {
      user = config.users[mail]
      break
    }
  }
  event.locals.user = <User> user
}

// Invoked for each endpoint called and initially for SSR router
export const handle: Handle = async ({ event, resolve }) => {
  const { cookies } = event
  const sessionId = cookies.get('session')

  // before endpoint or page is called
  if (sessionId) {
    await attachUserToRequestEvent(sessionId, event)
  }
  
  if (!event.locals.user) cookies.delete('session')

  const response = await resolve(event)

  // after endpoint or page is called
  return response
}
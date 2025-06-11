import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { config } from '$lib/config.js'

export const POST: RequestHandler = async (event) => {
  const { slug } = event.params

  switch (slug) {
    case 'logout':  
      return json({ message: 'Logout successful.' }, {
        headers: {
          'Set-Cookie': `session=; Path=/; SameSite=Lax; HttpOnly; Expires=${new Date().toUTCString()}`
        }
      })
    //case 'login':
    //case 'register':
    //  break
    default:
      error(404, 'Invalid endpoint.');
  }   
  /*
  const body = await event.request.json()

 
	// Ensures hooks.server.ts:handle() will not delete session cookie
	event.locals.user = authenticationResult.user

	return json(
		{
			message: authenticationResult.status,
			user: authenticationResult.user
		},
		{
			headers: {
				'Set-Cookie': `session=${authenticationResult.sessionId}; Path=/; SameSite=Lax; HttpOnly;`
			}
		}
	)*/
}
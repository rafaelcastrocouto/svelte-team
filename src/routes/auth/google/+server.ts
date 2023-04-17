import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { OAuth2Client } from 'google-auth-library'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'
import { config } from '$lib/config.js'

// Verify JWT per https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
async function getGoogleUserFromJWT(token: string): Promise<Partial<User>> {
  try {
    const client = new OAuth2Client(PUBLIC_GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: PUBLIC_GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload()
    if (!payload) throw error(500, 'Google authentication did not get the expected payload')
    return payload
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    throw error(500,`Google user could not be authenticated: ${message}`)
  }
}

// Returns local user if Google user authenticated (and authorized our app)
export const POST: RequestHandler = async event => {
  let message = 'Unauthorized Error Access'
  try {
    const { token } = await event.request.json()
    const user = await getGoogleUserFromJWT(token)

    if (user.email in config.users) {

      const userData = config.users[user.email]

      userData.token = token

      const userSession = Object.assign(user, userData);
      
      // Prevent hooks.server.ts's handler() from deleting cookie thinking no one has authenticated
      event.locals.user = userSession.user
  
      return json({
        message: 'Successful Google Sign-In.',
        user: userSession
      }, {
        headers: {
        'Set-Cookie': `session=${userSession.token}; Path=/; SameSite=Lax; HttpOnly;`}
      })
    } else {
      throw error(401, message)
    }
    
  } catch (err) {
    if (err instanceof Error) message = err.message
    throw error(401, message)
  }
}
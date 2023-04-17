import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { OAuth2Client } from 'google-auth-library'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'

const users = {
  'rafaelcastrocouto@gmail.com': 'rafael',
  'e.soghe@gmail.com': 'erlend'
};

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
    
    return {
      firstName: payload['given_name'] || 'UnknownFirstName',
      lastName: payload['family_name'] || 'UnknownLastName',
      email: payload['email']
    }
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    throw error(500,`Google user could not be authenticated: ${message}`)
  }
}

// Returns local user if Google user authenticated (and authorized our app)
export const POST: RequestHandler = async event => {
  try {
    const { token } = await event.request.json()
    const user = await getGoogleUserFromJWT(token)

    console.log(user)
    if (user.email in users) {

      const userSession = {
        user: users[user.email],
        name: users[user.email],
        id: token,
        email: user.email
      };
      // Prevent hooks.server.ts's handler() from deleting cookie thinking no one has authenticated
      event.locals.user = userSession.user
  
      return json({
        message: 'Successful Google Sign-In.',
        user: userSession.user
      }, {
        headers: {
        'Set-Cookie': `session=${userSession.id}; Path=/; SameSite=Lax; HttpOnly;`}
      })
    } else {
      let message = 'Unauthorized Error Access'
      throw error(401, message)
    }
    
  } catch (err) {
    let message = ''
    if (err instanceof Error) message = err.message
    throw error(401, message)
  }
}
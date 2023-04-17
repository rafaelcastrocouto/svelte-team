// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
    
    interface Locals {
      user: User
    }
    
    interface PublicEnv { // $env/static/public
      PUBLIC_GOOGLE_CLIENT_ID: string
    }
    
	}

  interface AuthenticationResult {
    statusCode: number
    status: string
    user: User
    sessionId: string
  }
  
  interface Credentials {
    email: string
    password: string
  }
  
  interface UserProperties {
    id: number
    expires?: string // ISO-8601 datetime
    password?: string
    name?: string
    email?: string
  }
  
  type User = UserProperties | undefined | null
  
  interface UserSession {
    id: string,
    user: User
  }
}

export {};

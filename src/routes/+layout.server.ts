import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals }) => {
  
  // locals.user set by hooks.server.ts/handle(), undefined if not logged in
  const { user } = locals 
  
  return { user }
  
}
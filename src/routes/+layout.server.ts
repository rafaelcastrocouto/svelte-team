import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals }) => {
  console.log('layout', locals)
  const { user } = locals // locals.user set by hooks.server.ts/handle(), undefined if not logged in
  return { user }
}
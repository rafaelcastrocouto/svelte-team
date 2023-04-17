import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
  
  console.log('admin locals', locals)
  
	const { user } = locals
  
	const authorized = ['admin']
	if (!user || !authorized.includes(user.role)) {
		throw redirect(302, '/login?referrer=/admin')
	}

	return {
		message: 'Admin-only content from server.'
	}
}
import { auth } from '@/lib/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth

  if (isLoggedIn && req.nextUrl.pathname === '/login') {
    return Response.redirect(new URL('/', req.nextUrl.origin))
  }

  if (!isLoggedIn && req.nextUrl.pathname !== '/login') {
    return Response.redirect(new URL('/login', req.nextUrl.origin))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

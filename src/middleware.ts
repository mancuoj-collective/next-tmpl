import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { pathname } = request.nextUrl

  if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (session && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

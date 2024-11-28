import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { env } from '@/config/env'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === 'GET') {
    const response = NextResponse.next()
    const token = request.cookies.get('session')?.value ?? null
    if (token !== null) {
      response.cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        secure: env.NODE_ENV === 'production',
      })
    }
    return response
  }

  // CSRF protection
  const originHeader = request.headers.get('Origin')
  const hostHeader = request.headers.get('X-Forwarded-Host')

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, { status: 403 })
  }
  let origin: URL
  try {
    origin = new URL(originHeader)
  }
  catch {
    return new NextResponse(null, { status: 403 })
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, { status: 403 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}

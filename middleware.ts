import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { AUTH_TOKEN } from './constants/cookies'
import { decodeJwtPayload } from './lib/jwt'

const PUBLIC_PAGES = ['/login', '/signup', '/']

const PUBLIC_PAGE_SET = new Set(PUBLIC_PAGES.map(normalizePath))


function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

const isPublicPath = (pathname: string): boolean => {
  if (!pathname) {
    return false
  }

  return PUBLIC_PAGE_SET.has(normalizePath(pathname))
}

const isValidToken = (token?: string): boolean => {
  if (!token) {
    return false
  }

  const trimmed = token.trim()
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return false
  }

  const payload = decodeJwtPayload(trimmed)

  if (!payload || typeof payload.exp !== 'number') {
    return false
  }

  const currentTimestamp = Math.floor(Date.now() / 1000)
  return payload.exp > currentTimestamp
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_TOKEN)?.value
  const isAuthorized = isValidToken(token);


  if ((!isAuthorized && isPublicPath(pathname)) || pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next()
  }

  if(isPublicPath(pathname) && isAuthorized){
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  if (!isAuthorized) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

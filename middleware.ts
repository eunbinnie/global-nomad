import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokens = request.cookies.get('accessToken');

  if ((pathname.startsWith('/my') || pathname === '/activity/register') && !tokens) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((pathname.startsWith('/login') || pathname.startsWith('/signup')) && tokens) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my/:path*', '/login', '/signup', '/activity/:path*'],
};

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);
export default function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === 'oceanariumrosarioislands.com') {
    const canonical = request.nextUrl.clone();
    canonical.hostname = 'www.oceanariumrosarioislands.com';
    return NextResponse.redirect(canonical, 301);
  }
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

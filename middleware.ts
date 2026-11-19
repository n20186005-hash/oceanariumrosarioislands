import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
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
  matcher: ['/', '/(zh|en|es)/:path*'],
};

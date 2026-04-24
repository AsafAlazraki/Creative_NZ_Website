import { NextRequest, NextResponse } from 'next/server';
import redirects from './content/redirects.json';
 
const REDIRECT_MAP = new Map(redirects.map((r: any) => [r.from, r]));
const LOCALES = ['en', 'mi'] as const;
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
 
  // 1. Handle redirects
  const redirect = REDIRECT_MAP.get(pathname);
  if (redirect) {
    const url = new URL(redirect.to, request.url);
    return NextResponse.redirect(url, redirect.type ?? 301);
  }
 
  // 2. Strip trailing slashes (except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = new URL(request.url);
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }
 
  // 3. Locale detection for /mi routes is handled by app router segment
 
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!_next|api|_pagefind|favicon|robots.txt|sitemap.xml).*)'],
};

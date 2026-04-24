import { NextRequest, NextResponse } from 'next/server';
import redirects from './content/redirects.json';

type Redirect = { from: string; to: string; type?: number };
const REDIRECT_MAP = new Map<string, Redirect>(
  (redirects as Redirect[]).map((r) => [r.from, r])
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirect = REDIRECT_MAP.get(pathname);
  if (redirect) {
    const url = new URL(redirect.to, request.url);
    return NextResponse.redirect(url, redirect.type ?? 301);
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = new URL(request.url);
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|_pagefind|favicon|robots.txt|sitemap.xml).*)'],
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
	matcher: ["/dashboard"],
};

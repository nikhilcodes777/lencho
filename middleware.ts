import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);
  const isAuth = !!sessionCookie
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && !isAuth) {
    // Non-authenticated users trying to access dashboard
    return NextResponse.redirect(new URL("/signin", request.url));
  }

}

export const config = {
  matcher: ["/dashboard","/dashboard/:path","/signup","/signin"],
};

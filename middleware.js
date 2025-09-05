// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './app/lib/auth';

export async function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // If the user is trying to access the login page, let them proceed.
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // For any other admin route, check for a valid token.
  const userPayload = await verifyToken(token);

  // If there's no valid token, redirect to the login page.
  if (!userPayload) {
    const loginUrl = new URL('/admin/login', request.url);
    // You can add a 'from' query parameter to redirect back after login
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// This config ensures the middleware runs on ALL admin routes
// defined inside your app/(admin) folder.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/inquiries/:path*',
    '/consultant-paid/:path*',
    '/company-registration/:path*',
    '/director-details/:path*',
    '/msme/:path*',
    '/itr/:path*',
    '/defective-itr/:path*',
  ],
};
// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  // To sign out, we send back a response that clears the auth cookie.
  const response = NextResponse.json({ success: true, message: 'Logout successful' }, { status: 200 });
  
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0), // Set the expiry date to the past to delete it
  });

  return response;
}
// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { createToken, verifyPassword } from '@/app/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // --- CHANGE HERE ---
    // Use environment variables instead of hardcoded strings
    const storedUsername = process.env.ADMIN_USERNAME;
    const storedPassword = process.env.ADMIN_PASSWORD;
    // --- END CHANGE ---

    // Note: The verifyPassword function you have might be for hashed passwords.
    // If you are storing a plain password in env vars, a simple comparison is enough.
    // Let's assume for now it's a simple comparison for this example.
    if (username === storedUsername && password === storedPassword) {
      const token = await createToken({ username });

      const response = NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 2, // 2 hours
      });

      return response;
    } else {
      return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}

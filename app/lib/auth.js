// app/lib/auth.js
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function createToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    return null;
  }
}

export function verifyPassword(password, storedPassword) {
    return password === storedPassword;
}
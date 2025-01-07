import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

if (!env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET is not set');

type Payload = { userId: number };

export function signToken(userId: number) {
  const payload: Payload = { userId };
  const opts = { expiresIn: "1h" };

  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET!, opts);
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as Payload;
}


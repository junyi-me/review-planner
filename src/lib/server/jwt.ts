import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

if (!env.TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET is not set');

export type TokenPayload = { userId: number };
type ExpireIn = "1h" | "1d" | "30d";

export function signToken(userId: number, expiresIn: ExpireIn = "1h") {
  const payload: TokenPayload = { userId };
  const opts = { expiresIn };

  return jwt.sign(payload, env.TOKEN_SECRET!, opts);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, env.TOKEN_SECRET!) as TokenPayload;
  } catch (e) {
    return null;
  }
}


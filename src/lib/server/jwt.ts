import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

if (!env.ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET is not set');

type TokenPayload = { userId: number };
type ExpireIn = "1h" | "1d" | "30d";

export function signToken(userId: number, expiresIn: ExpireIn = "1h") {
  const payload: TokenPayload = { userId };
  const opts = { expiresIn };

  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET!, opts);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as TokenPayload;
  } catch (e) {
    return null;
  }
}


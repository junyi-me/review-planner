import { env } from '$env/dynamic/private';
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(new URL(env.AUTH_JWKS_URL));

export type AccessTokenPayload = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time: number;
  acr: string;
}

export async function decodeToken(token: string) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: env.AUTH_ISSUER,
      audience: env.CLIENT_ID,
    });

    return payload;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

export async function decodeAccessToken(token: string): Promise<AccessTokenPayload | null> {
  return decodeToken(token) as Promise<AccessTokenPayload | null>;
}


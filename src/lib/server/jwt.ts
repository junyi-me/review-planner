import { env } from '$env/dynamic/private';
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(new URL(env.AUTH_JWKS_URL));

export type TokenPayload = { 
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time: number;
  acr: string;
  amr: string[];
  sid: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  preferred_username: string;
  nickname: string;
  groups: string[];
  azp: string;
  uid: string;
}

export async function getTokenPayload(token: string): Promise<TokenPayload | null> {
  if (!token) {
    return null;
  }

	try {
		const { payload } = await jwtVerify(token, JWKS, {
			issuer: env.AUTH_ISSUER,
			audience: env.CLIENT_ID,
		});

		return payload as TokenPayload;
	} catch (err) {
		console.error('Invalid token:', err);
		return null;
	}
}


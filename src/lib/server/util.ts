import type { TokenPayload } from "./jwt";

export function getTokenPayload(locals: App.Locals): TokenPayload {
  // @ts-ignore
  return locals.user as TokenPayload;
}


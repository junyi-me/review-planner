import type { RequestEvent } from "../$types";
import { deleteAccessToken } from "./util";

export async function GET({ cookies }: RequestEvent) {
  deleteAccessToken(cookies);
  return new Response(null, { status: 204 });
}


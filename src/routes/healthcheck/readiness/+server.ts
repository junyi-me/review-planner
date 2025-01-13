import { db } from "$lib/server/db";
import { sql } from "drizzle-orm";

export async function GET() {
  await db.execute(sql`select 1`);

  return new Response(JSON.stringify({
    message: "ok",
  }), { status: 200 });
}


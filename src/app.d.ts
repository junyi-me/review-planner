// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AccessTokenPayload } from "$lib/server/jwt";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user: AccessTokenPayload | null;
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

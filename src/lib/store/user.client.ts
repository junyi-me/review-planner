import { browser } from "$app/environment";
import type { UserInfo } from "$lib/api";
import { derived, writable } from "svelte/store";

let storedUser: UserInfo|null = null;
if (browser) {
  const strUser = localStorage.getItem('user');
  if (strUser === null) {
    storedUser = null;
  } else {
    storedUser = JSON.parse(strUser) as UserInfo;
  }
}

export const localUser = writable<UserInfo|null>(storedUser);

if (browser) {
  localUser.subscribe(value => {
    if (!value) {
      localStorage.removeItem('user');
      return;
    }
    localStorage.setItem('user', JSON.stringify(value));
  });
}

export const loggedIn = derived(localUser, $user => $user !== null);

export function logout() {
  localUser.set(null);
}


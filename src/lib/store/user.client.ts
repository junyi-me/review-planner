import { browser } from "$app/environment";
import { derived, writable } from "svelte/store";

export type UserInfo = {
  email: string;
  name: string;
}
const defaultUser: UserInfo = { email: '', name: '' };

let storedUser: UserInfo = defaultUser;
if (browser) {
  storedUser = JSON.parse(localStorage.getItem('user') || 'null') || { email: '', name: '' } as UserInfo;
}

export const user = writable<UserInfo>(storedUser);

if (browser) {
  user.subscribe(value => {
    localStorage.setItem('user', JSON.stringify(value));
  });
}

export const loggedIn = derived(user, $user => $user.email !== '');

export function logout() {
  user.set(defaultUser);
}


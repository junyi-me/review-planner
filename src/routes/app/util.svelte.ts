export const reloadProjState = $state<{ loading: boolean }>({ loading: false });
export function setReloadProjState(loading: boolean) {
  reloadProjState.loading = loading;
}


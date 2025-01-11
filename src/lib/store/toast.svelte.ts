export type ToastType = {
  message: string;
  type: "success" | "error" | "done";
}

export const toastState = $state<ToastType>({ message: "", type: "done" });

export function setToastState(toast: ToastType) {
  toastState.type = toast.type;
  toastState.message = toast.message;
}


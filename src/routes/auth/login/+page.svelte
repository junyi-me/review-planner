<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { setToastState } from "$lib/store/toast.svelte";
  import { user } from "$lib/store/user.client";
  import { onMount } from "svelte";
  import { REGIST_DONE_PARAM } from "../regist/util";

  const justRegistered = page.url.searchParams.has(REGIST_DONE_PARAM);
  onMount(() => {
    if (justRegistered) setToastState({ type: "success", message: "Registration complete. Please log in." });
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    const resp = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      console.error("Login failed", resp);
      setToastState({ type: "error", message: "Login failed." })
      return;
    }

    const data = await resp.json();
    user.set({
      name: data.name,
      email: data.email,
    });

    goto("/app")
  }
</script>

<h1>Login</h1>

<form on:submit={handleSubmit}>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />
  <br />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required />
  <br />

  <button type="submit">Login</button>
  <a href="/auth/regist">Sign up</a>
</form>


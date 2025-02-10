<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { user } from "$lib/store/user.client";
  import { onMount } from "svelte";
  import { REGIST_DONE_PARAM } from "../regist/util";
  import { setToastState } from "$lib/store/global.svelte";

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

<div class="container">
  <form onsubmit={handleSubmit}>
    <h1>Login</h1>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
    <br />

    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
    <br />
    <br />

    <button class="primary" type="submit">Login</button>
    <button class="secondary" type="button" onclick={() => goto("/auth/regist")}>Sign up</button>
  </form>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--gap-small);
    min-width: 300px;
    margin-top: -10em;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: var(--gap-tiny);
    border: 1px solid var(--border);
    border-radius: var(--gap-tiny);
  }

  button {
    padding: var(--gap-tiny) var(--gap-small);
    border: none;
    border-radius: var(--gap-tiny);
    cursor: pointer;
  }
</style>


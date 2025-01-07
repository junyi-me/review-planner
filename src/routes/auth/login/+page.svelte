<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { obtain } from "$lib/api.client";
  import { user } from "$lib/store/user.client";
  import { REGIST_DONE_PARAM } from "../regist/util";

  const justRegistered = page.url.searchParams.has(REGIST_DONE_PARAM);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target;
    if (form == null || !(form instanceof HTMLFormElement)) {
      return;
    }
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    const resp = await obtain("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      throw new Error("Login failed");
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

{#if justRegistered}
  <p class="regist">Sign up completed. Please login.</p>
{/if}

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

<style>
  .regist {
    color: green;
  }
</style>


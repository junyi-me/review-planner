<script lang="ts">
  import { goto } from "$app/navigation";
  import { REGIST_DONE_PARAM } from "./util";

  const postRegistUrl = '/auth/login';

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target;
    if (form == null || !(form instanceof HTMLFormElement)) {
      return;
    }
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('nickname');

    const resp = await fetch('/auth/regist', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    if (!resp.ok) {
      alert('Failed to sign up');
      return;
    }

    goto(`${postRegistUrl}?${REGIST_DONE_PARAM}`);
  }
</script>

<div class="container">
  <form onsubmit={handleSubmit}>
    <h1>Sign up</h1>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
    <br />

    <label for="nickname">Nickname</label>
    <input type="text" id="nickname" name="nickname" required />
    <br />

    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
    <br />

    <label for="confirmPassword">Confirm Password</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required />
    <br />

    <button class="primary" type="submit">Sign up</button>
    <button class="secondary" type="button" onclick={() => goto(postRegistUrl)}>Login</button>
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


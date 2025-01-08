<script lang="ts">
  import { goto } from "$app/navigation";
  import { obtain } from "$lib/api.client";
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

    const resp = await obtain('/auth/regist', {
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

<h1>Sign up</h1>
<form on:submit={handleSubmit}>
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

  <button type="submit">Sign up</button>
  <a href={postRegistUrl}>Login</a>
</form>


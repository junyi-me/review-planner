<script lang="ts">
  import { goto } from "$app/navigation";
  import { obtain } from "$lib/api.client";
  import { DEFAULT_OFFSETS } from "$lib/util";

  let offsetDays = $state(DEFAULT_OFFSETS); // TODO from last created project

  function handleOffsetDayChange(i: number, e: Event) {
    const target = e.target as HTMLInputElement;
    offsetDays[i] = parseInt(target.value);
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");

    const resp = await obtain(undefined, {
      method: "POST",
      body: JSON.stringify({ name, description, offsetDays }),
    });

    if (!resp.ok) {
      throw new Error("Create project failed");
    }

    const data = await resp.json();
    const { id } = data;

    goto(`/app/project/${id}`);
  }
</script>

<h1>Create project</h1>

<form onsubmit={handleSubmit}>
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required />
  <br />

  <label for="description">Description</label>
  <textarea id="description" name="description"></textarea>
  <br />

  <p>Iterations</p>
  <table>
    <thead>
      <tr>
        <th>Iteration</th>
        <th>+days</th>
      </tr>
    </thead>
    <tbody>
      {#each offsetDays as offsetDay, i}
        <tr>
          <td>{i + 1}</td>
          <td>
            <input type="number" name="offsetDays" value={offsetDay} 
              onfocusin={e => (e.target as HTMLInputElement).select()} 
              onchange={e => handleOffsetDayChange(i, e)} />
          </td>
          <td>
            <button type="button" onclick={() => offsetDays = offsetDays.filter((_, j) => j !== i)}>Remove</button>
          </td>
        </tr>
      {/each}
      <tr>
        <td></td>
        <td>
          <button type="button" 
            onclick={() => offsetDays = [...offsetDays, offsetDays[offsetDays.length-1] * 2]}>
            Add iteration
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <br />

  <button type="submit">Create</button>
</form>


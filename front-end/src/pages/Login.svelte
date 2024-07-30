<script>
  let username = "";
  let password = "";

  let isSuccess = false;

  let errors = {};

  const handleSubmit = async () => {
    errors = {};

    if (username.length === 0) {
      errors.email = "Field should not be empty";
    }
    if (password.length === 0) {
      errors.password = "Field should not be empty";
    }

    fetch ("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((res) => {
        console.log(res);
          if (res.status != 200) {
              return res.json();
          } else {
              isSuccess = true;
          }
          return res.json();
      })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
      });

  };
</script>

<style>

</style>

<form on:submit|preventDefault={handleSubmit}>
  {#if isSuccess}
    <div class="success">
      You've been successfully logged in.
    </div>
  {:else}

    <label for="username">Username</label>
    <input name="username" placeholder="username" bind:value={username} />

    <label for="password">Password</label>
    <input name="password" type="password" placeholder="password" bind:value={password} />

    <button type="submit">Login</button>

    {#if Object.keys(errors).length > 0}
      <ul class="errors">
        {#each Object.keys(errors) as field}
          <li>{field}: {errors[field]}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</form>
<span>Dont have an account? Register </span>
<a href="/register">here</a>
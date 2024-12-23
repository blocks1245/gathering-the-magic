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
      if (username.length < 3) {
        errors.password = "Password should be at least 8 characters long";
      }
      if (password.length < 8) {
        errors.password = "Password should be at least 8 characters long";
      }
  
      fetch ("http://localhost:3000/auth/register", {
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
            if (res.status != 201) {
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
        Account successfully created.
      </div>
    {:else}
  
      <label for="username">Username</label>
      <input name="username" placeholder="username" bind:value={username} />
  
      <label for="password">Password</label>
      <input name="password" type="password" placeholder="password" bind:value={password} />
  
      <button type="submit">Register</button>
  
      {#if Object.keys(errors).length > 0}
        <ul class="errors">
          {#each Object.keys(errors) as field}
            <li>{field}: {errors[field]}</li>
          {/each}
        </ul>
      {/if}
    {/if}
  </form>
  <span>Already have an account? Login </span>
  <a href="/login">here</a>
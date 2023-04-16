<script>
  let message = 'You are not logged in.';
</script>

<div class="container">
  <h4>{message}</h4>
  <form>
    <p>
      <label for="email">Email</label>
      <input id="email" type="email" placeholder="name@example.com" required>
    </p>
    <p>
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="******" min-length="6" required>
    </p>
     <p>
       <button type="submit">Submit</button>
     </p>
  </form>
</div>
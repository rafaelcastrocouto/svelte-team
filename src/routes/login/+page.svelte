<script>
  let message = 'You are not logged in.';
</script>

<div class="container">
  
  <h4>{message}</h4>
  
  <form method="POST" action="?/register">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="name@example.com" required>
    <label for="password">Password</label>
    <input id="password" type="password" placeholder="******" min-length="6" required>
     <button type="submit">Submit</button>
  </form>
  
</div>
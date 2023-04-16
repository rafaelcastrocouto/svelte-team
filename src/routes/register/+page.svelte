<script>
  let message = 'Please register your user account.';
</script>

<div class="container">
  <h4>{message}</h4>
  <form>
    <label for="name">Name</label>
    <input id="name" type="text" placeholder="Your Name" required>
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="name@example.com" required>
    <label for="password">Password (min 6 chars)</label>
    <input id="password" type="password" placeholder="******" min-length="6" required>
     <button type="submit">Submit</button>
  </form>
</div>
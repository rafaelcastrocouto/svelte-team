<script>
  import { config } from '$lib/config.js';

  //const orgs = ['spicylobstergames', 'fishfolk'/*, 'commune-os'*/];

  async function githubJson (url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
  
  async function userData (username) {
    const user_url ='https://api.github.com/users/';
    const json = await githubJson(user_url+username);
    //return JSON.stringify(json);
    return json;
  }
  //const data = userData('rafaelcastrocouto');
  
  async function userDataList (members) {
    const promises = members.map(userData);
    const json = await Promise.all(promises);
    //return JSON.stringify(json);
    return json;
  }
  //const data = userDataList(['orhun','rafaelcastrocouto','erlend-sh']);
  
  async function orgData (orgname) {
    const org_url = 'https://api.github.com/orgs/';
    const json = await githubJson(org_url+orgname+'/members');
    //return JSON.stringify(json);
    return json;
  }
  //const data = orgData('fishfolk');
  
  async function orgDataList (org) {
    const teamJSON = await orgData(org);
    //console.log(teamJSON)
    const list = teamJSON.map( (user) => user.login )
    return list;
  }
  //const data = orgDataList('fishfolk');
  
  async function uniqueList (orgs) {
    const promises = orgs.map(orgDataList);
    const list = await Promise.all(promises);
    const unique = Array.from(new Set([].concat( ...list )));
    return unique;
  }
  //const data = uniqueList(['spicylobstergames', 'fishfolk']);
  
  async function mergeTeams (orgs) {
    const everyone = await uniqueList(orgs);
    const json = await userDataList(everyone);
    //return JSON.stringify(json);
    return json
  }
  
  const data = mergeTeams(config.orgs);

</script>

<div class="members">
  
  {#await data then users}
    {#each users as user}
      
      <div class="member">
        
        <a href="{user.html_url}" target="_blank">
          <img src={user.avatar_url} alt="user avatar" class="user_avatar">
        </a>
        
        <h4>
        {#if user.twitter_username} 
          <a href="https://twitter.com/{user.twitter_username}" target="_blank">@{user.twitter_username}</a> 
        {:else}
          <a href="{user.html_url}" target="_blank">{user.login}</a>
        {/if}
        </h4>
        
        {#if user.blog} 
          <p>
            {#if user.blog.startsWith('http')}
              <a href="{user.blog}" target="_blank">{user.blog}</a>
            {:else}
              <a href="//{user.blog}" target="_blank">{user.blog}</a>
            {/if}
          </p>
        {/if}
        
        {#if user.company} <p>{user.company}</p> {/if}
        {#if user.location} <p>{user.location}</p> {/if}
        {#if user.bio} <p>{user.bio}</p> {/if}
        
      </div>
      
    {/each}
  {/await}
  
</div>

<style>
  .user_avatar {
    border-radius: 50%;
    margin: 3rem 0 0;
    height: 6rem;
    width: 6rem;
  }
  .member p {
    margin: 0.5rem 0 0;
  }
</style>
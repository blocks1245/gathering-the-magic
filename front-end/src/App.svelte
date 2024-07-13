<script>
  import router from 'page';

  // logo
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';

  // components
  import Header from './components/Header.svelte';

  // pages
  import Home from './pages/Home.svelte';

  let page;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router.start();
</script>

<main>
  <Header active={currentRoute}/>
  <svelte:component this={page}/>
</main>

<style>
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

main {
  /*text-align: center;*/
  /*padding: 1em;*/
  margin: 0 auto;
  width: 100vw;
}
</style>

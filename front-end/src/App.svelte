<script>
  import router from 'page';

  // logo
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';

  // components
  import Header from './components/Header.svelte';

  // pages
  import Home from './pages/Home.svelte';
  import CardInfoPage from './pages/CardInfoPage.svelte';

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/card-info', (ctx) => {
    page = CardInfoPage;
    currentRoute = ctx.pathname;
  });
  router.start();
</script>

<main>
  <Header active={currentRoute}/>
  <svelte:component this={page} {params}/>
</main>

<style>
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

main {
  position: fixed;
  top: 0px;
  left: 0px;
  text-align: center;
  margin: 0 auto;
  width: 100vw;
}
</style>

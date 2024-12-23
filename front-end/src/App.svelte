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
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import CardSearch from './pages/CardSearch.svelte';

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
  router('/login', (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
  });
  router('/register', (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
  });
  router('/card-search', (ctx) => {
    page = CardSearch;
    currentRoute = ctx.pathname;
  });


  router.start();
</script>

<svelte:head>
  <link rel="stylesheet" href="src\css\keyrune.css" />
  <link rel="stylesheet" href="src\css\mana.css" />
</svelte:head>

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

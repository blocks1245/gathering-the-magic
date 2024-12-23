<script>
    export let active;
</script>
<nav>
    <ul>
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/card-info"} href="/card-info">Card info</a></li>
        <li><a class:active={active === "/card-search"} href="/card-search">Search Cards</a></li>

        <li><a class:active={active === "/login"} href="/login">Login</a></li>
        <li><a class:active={active === "/register"} href="/register">Register</a></li>
    </ul>
</nav>

<style>
    ul {
        align-content: end;
        list-style-type: none;
        margin-block-start: 0px;
        margin-block-end: 0px;
        padding-inline-start: 0px;
        background: #009878;

    }
    li a{
        text-decoration: none;
        color: white;
        padding: 1em;
        float: left;
    }
    li a:hover{
        background: #53d0b4;
    }

    a.active {
        font-weight: bold;

    }
</style>
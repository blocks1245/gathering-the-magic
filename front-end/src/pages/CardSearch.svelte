<script>
    import CardList from "../components/CardList.svelte";
    import { queryToJson } from "../utils/queryToJson";

    const urlParams = new URLSearchParams(window.location.search);
    const user_query = urlParams.get('query');

    if (user_query) {
        let body = queryToJson(user_query);
        console.log(body)
    }
</script>

<main>
    <div>
        <form>
            <input id="search_bar" name="query" placeholder="Search for a card" value={user_query}/>
        </form>
    </div>
    <div>
        <CardList/>
    </div>
</main>
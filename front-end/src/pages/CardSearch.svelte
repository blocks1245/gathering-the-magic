<script>
    import { get } from "svelte/store";
    import CardList from "../components/CardList.svelte";
    import { queryToJson } from "../utils/queryToJson";

    const urlParams = new URLSearchParams(window.location.search);
    const user_query = urlParams.get('query');
    const page = Number(urlParams.get('page'))

    let thingy = {};

    async function send_query(body) {
        const url = "http://localhost:3000/search/"
        try {
            const response = await fetch(url, {body: JSON.stringify(body), method: 'POST'});
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            thingy = await response.json();
            console.log(thingy)
        } catch (error) {
            console.error(error.message);
        }
    }

    async function main() {
        if (user_query) {
            let body = Object();
            body.search_data = (queryToJson(user_query));
            if (isNaN(page) || page < 1) {
                body.page = 1;
            } else {
                body.page = page;
            };
            console.log(body)
            send_query(body)
        }
    };

    main();
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
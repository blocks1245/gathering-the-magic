<script>
    import { get } from "svelte/store";
    import CardList from "../components/CardList.svelte";
    import { queryToJson } from "../utils/queryToJson";

    const urlParams = new URLSearchParams(window.location.search);
    const user_query = urlParams.get('query');
    const page = Number(urlParams.get('page'))

    let backend_response = {};

    function next_page() {
        if (page == 0) {
            change_page(2)
        } else {
            change_page(page+1)
        }
        return void {};
    };

    function previous_page() {
        if (page >= 2) {
            change_page(page-1)
        }
        return void {};
    };

    function change_page(to) {
        const url = location.toString().split('?')[0]
        const newUrl = url + '?query=' + encodeURIComponent(user_query) + '&page=' + encodeURIComponent(String(to))
        document.location.href = newUrl;
    }

    async function send_query(body) {
        const url = "http://localhost:3000/search/"
        const options = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body)
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            backend_response = await response.json();
            console.log(backend_response)
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

            window.addEventListener("DOMContentLoaded", (event) => {
            const next = document.getElementById('next_page');
            const previous = document.getElementById('previous_page')
            if (next) {
                next.addEventListener('click', next_page, false);
            }
            if (previous) {
                previous.addEventListener('click', previous_page, false);
            }
            });
        }
    };


    main();
</script>

<main>
    <div>
        <form>
            <input id="search_bar" name="query" placeholder="Search for a card" value={user_query}/>
        </form>
        <button id="previous_page">Previous page</button>
        <button id="next_page">Next page</button>
    </div>
    <div>
        <CardList/>
    </div>
</main>
<script>
    export let id;
    let card_json = {};
    // $: img_url = card_json.image_uris.normal;
    let img_url = ""

    async function getCard(id) {
        const url = "https://api.scryfall.com/cards/" + id
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            card_json = await response.json();
            console.log(card_json);

        } catch (error) {
            console.error(error.message);
        }
    }

    if (id) {
        getCard(id);
        console.log(card_json.image_uris);
        // let img_url_obj = card_json.image_uris;
        // img_url = img_url_obj.normal;
    }
</script>

<main>
    <p>{card_json.name} {card_json.mana_cost}</p>
    <p>{card_json.type_line}</p>
    <img src={card_json?.image_uris?.normal} alt="Image: {card_json.name}"/>
</main>
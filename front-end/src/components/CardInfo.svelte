<script>
    export let id;
    let card_json = {};

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
    }
</script>

<main>
    <br/>
    <div class="row">
        <div class="column img_column">
            <img class="card_img" src={card_json?.image_uris?.normal} alt="Image: {card_json.name}"/>
            <p>Artist: {card_json.artist}</p>
        </div>
        <div class="column text_column">
            <h2 class="card_info">{card_json.name} {card_json.mana_cost}</h2>
            <hr class="card_info_line">
            <p class="card_info">{card_json.type_line} *verander "{card_json.set}" en "{card_json.rarity}" naar logo*</p>
            <p class="card_info">{card_json.oracle_text}</p>
            {#if card_json.flavor_text}
            <p class="card_info"><em>{card_json.flavor_text}</em></p>
            {/if}
            {#if card_json.power}
            <p class="card_info">{card_json.power}/{card_json.toughness}</p>
            {/if}
            <hr class="card_info_line">
        </div>
    </div>
</main>

<style>
    .column {
        float: left;
    }

    .img_column {
        width: 50%;
    }

    .text_column {
        width: 30%;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .card_info {
        text-align: left;
    }

    .card_img {
        width: 60%;
        height: auto;
    }

    .card_info_line {
        width: 100%;
        text-align: left;
        margin-left: 0;
    }
</style>
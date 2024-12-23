<script>
    import { symbols } from "../utils/lookUpManaSymbol";

    export let id;
    export let width;
    export let height;

    let card_json = {};
    let mana_cost = "";
    let card_text = "";

    async function getCard(id) {
        const url = "https://api.scryfall.com/cards/" + id
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            card_json = await response.json();
        } catch (error) {
            console.error(error.message);
        }
    }

    function replaceManaSymbols(input) {
        return input.replace(/{.*?}/g, m => symbols[m.slice(1,-1)]+"&nbsp;")
    }
    
    async function main() {
        if (id) {
            await getCard(id);
            console.log(card_json.oracle_text)
            card_text = replaceManaSymbols(card_json.oracle_text)
            mana_cost = replaceManaSymbols(card_json.mana_cost)
        }
    }

    main()
</script>

<main>
    <div class="container" style="height: {height}px;width: {width}px">
        <div class="column">
            <div class="row">
                <!-- card image size is 488*680 -->
                {#if (height/680 < (width/2)/488)}
                <div class="container" style="height: {height}px;">
                    <img class="card_img" src={card_json?.image_uris?.normal} alt="Image: {card_json.name}" style="height: {height}px"/>
                </div>
                {:else}
                <div class="container" style="height: {height};">
                    <img class="card_img" src={card_json?.image_uris?.normal} alt="Image: {card_json.name}" style="width: {width/2}px"/>
                </div>
                {/if}
            </div>
        </div>
        <div class="column">
            <div class="row">
                <div class="container" style="height: {height}px; overflow-y: scroll; overflow-x:hidden">
                    <h2 class="card_info" style="display: inline;">{card_json.name}</h2>&nbsp;{@html mana_cost}
                    <hr class="card_info_line">
                    <p class="card_info">{card_json.type_line} <i class="ss ss-{card_json.set} ss-{card_json.rarity} ss-2x"></i></p>
                    <p class="card_info">{@html card_text.replaceAll("\n", "<br/>")}</p>
                    {#if card_json.flavor_text}
                    <p class="card_info"><em>{card_json.flavor_text}</em></p>
                    {/if}
                    {#if card_json.power}
                    <p class="card_info">{card_json.power}/{card_json.toughness}</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .column {
        float: left;
        width: 50%;
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

    .card_info_line {
        width: 100%;
        text-align: left;
        margin-left: 0;
    }

    .card_img {
        border-radius: 5% 5% 5% 5%;
    }

    /* to debug */
    /* .container {
        border: 1px solid orange
    } */
</style>
// convert a string with an search request inputted by a user into a json string
export function queryToJson(user_input) {
    const query = user_input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) // split the string by spaces not enclosed by single or double quotes

    var query_json = Object();
    query_json.name = [];
    query_json.color = [];
    query_json.oracle_text = [];
    query_json.type = [];
    query_json.color_identity = [];
    query_json.power = [];
    query_json.toughness = [];
    query_json.rarity = [];
    query_json.mana_value = [];
    query_json.mana_cost = [];
    query_json.set = [];
    
    for (const argument of query) {
        let keyword, value = [null, null]

        keyword = argument.match(/.*(?=[!:=<>]+)/)
        value = argument.match(/[!:=<>]+.*/)

        if (value) {
            value = value[0]
        }

        if (keyword) {
            keyword = keyword[0].toLowerCase();
        } else {
            value = argument;
        }
        switch (keyword) {
            case null:
            case "name":
                query_json.name.push(value);
                break;

            case "c":
            case "color":
            case "colour":
                query_json.color.push(value);
                break;

            case "o":
            case "oracle":
                query_json.oracle_text.push(value);
                break;

            case "t":
            case "type":
                query_json.type.push(value);
                break;

            case "id":
            case "identity":
                query_json.color_identity.push(value);
                break;

            case "pow":
            case "power":
                query_json.power.push(value);
                break;

            case "tou":
            case "toughness":
                query_json.toughness.push(value);
                break;

            case "r":
            case "rarity":
                query_json.rarity.push(value);
                break;

            case "mv":
            case "cmc": // converted mana cost
                query_json.mana_value.push(value);
                break;

            case "m":
            case "mana":
                query_json.mana_cost.push(value);
                break;

            case "s":
            case "set":
                query_json.set.push(value)
        }

    }

    return query_json
}
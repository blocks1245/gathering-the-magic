import * as db from '../database/database_helper.js';

const keyToColumnMapping = {
    name: "name",
    color: "colors",
    oracle_text: "oracle_text",
    type: "type_line",
    color_identity: "color_identity",
    power: "power",
    toughness: "toughness",
    rarity: "rarity",
    mana_value: "cmc",
    mana_cost: "mana_cost",
    set: "set"
};

const operatorMapping = {
    "=": "ilike", // lowercase to differenciate it from the not exact match versions
    ":": "iLIKE",
    "!": "!iLIKE",
    "<": "<",
    ">": ">",
};


function constructQuery(jsonData) {
    const conditions = [];
    const parameters = [];

    const mappedData = Object.entries(jsonData).reduce((acc, [key, values]) => {
        if (keyToColumnMapping[key]) {
            acc[keyToColumnMapping[key]] = values;
        }
        return acc;
    }, {});

    Object.entries(mappedData).forEach(([column, values]) => {
        if (!values || values.length === 0) return;

        values.forEach((value) => {
            let operator = "=";
            if (operatorMapping[value[0]]) {
                operator = operatorMapping[value[0]];
                value = value.slice(1);
            }

            conditions.push(`${column} ${operator} $${parameters.length + 1}`);
            parameters.push(operator.includes("LIKE") ? `%${value}%` : value);
        });
    });
    return { conditions, parameters };
}

export async function search(req, res) {
    try {
        const { search_data, page = 1 } = req.body;
        const { conditions, parameters } = constructQuery(search_data);
        const results = await db.search(conditions, parameters, page);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

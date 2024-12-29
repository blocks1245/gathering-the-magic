import pkg from 'pg';

const { Client } = pkg;

const client = new Client({
    user: `${process.env.POSTGRES_USER || 'gtm'}`,
    host: `${process.env.POSTGRES_HOST || 'localhost'}`,
    database: `${process.env.POSTGRES_DB || 'gtm'}`,
    password: `${process.env.POSTGRES_PASSWORD || 'gtm'}`,
    port: `${process.env.POSTGRES_PORT || 5432}`,
});

client
    .connect()
    .then(() => console.log('Connected to database'))
    .catch((e) => console.log(e));

export async function runQuery(query, params = []) {
    try {
        const res = await client.query(query, params);
        return res.rows;
    }
    catch (e) {
        console.log(e);
    }
}


// database helper functions

// card functions
export async function getAllCards() {
    return await runQuery('SELECT * FROM cards');
}

export async function getCardById(id) {
    return await runQuery(`SELECT * FROM cards WHERE id = $1`, [id]);
}

export async function getCardByName(name) {
    return await runQuery(`SELECT * FROM cards WHERE UPPER(name) like UPPER($1)`, [name]);
}


// user functions
export async function getUserByUsername(username) {
    return await runQuery(`SELECT * FROM users WHERE username = $1`, [username]);
}

export async function addUser(username, password) {
    return await runQuery(`INSERT INTO users (username, password) VALUES ($1, $2)`, [username, password]);
}

// search functions
export async function search(conditions, parameters, page) {
    const page_size = 50;
    if (!Number.isInteger(page)) {
        return "fuck you, stop injecting sql";
    }
    if (conditions.length > 0) {
        const query = `SELECT id, name, set, image_uris FROM cards` + (conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "") + ` ORDER BY name LIMIT ${page_size} OFFSET ${(page*page_size)-page_size};`;
        console.log(query);
        return await runQuery(query, parameters);
    } else {
        return [];
    }
}
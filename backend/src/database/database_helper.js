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

async function runQuery(query) {
    try {
        console.log('Running query:', query);
        const res = await client.query(query);
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
    return await runQuery(`SELECT * FROM cards WHERE id = '${id}'`);
}

export async function getCardByName(name) {
    return await runQuery(`SELECT * FROM cards WHERE UPPER(name) like UPPER('${name}')`);
}


// user functions
export async function getUserByUsername(username) {
    return await runQuery(`SELECT * FROM users WHERE username = '${username}'`);
}

export async function addUser(username, password) {
    return await runQuery(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`);
}
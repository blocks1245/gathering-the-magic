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

export async function getAllCards() {
    return await runQuery('SELECT * FROM cards');
}

export async function getCardById(id) {
    return await runQuery(`SELECT * FROM cards WHERE id = '${id}'`);
}
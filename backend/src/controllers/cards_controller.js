import * as db from '../database/database_helper.js';

export async function getAllCards(req, res) {
    const cards = await db.getAllCards();
    res.json(cards);
}

export async function getCardById(req, res) {
    const id = req.params.id;
    const card = await db.getCardById(id);
    res.json(card);
}

export async function getCardByName(req, res) {
    const name = req.params.name;
    const card = await db.getCardByName(name);
    res.json(card);
}
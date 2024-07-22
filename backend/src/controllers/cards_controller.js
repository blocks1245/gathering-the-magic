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
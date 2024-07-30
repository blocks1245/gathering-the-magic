import express from 'express';

import * as cardsController from '../controllers/cards_controller.js';

const router = express.Router();

// all routes for /cards
// router.get('/', cardsController.getAllCards);
router.get('/:id', cardsController.getCardById);
router.get('/:name', cardsController.getCardByName);

export default router;
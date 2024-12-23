import express from 'express';

import * as cardsController from '../controllers/cards_controller.js';

const router = express.Router();

// all routes for /cards
// router.get('/', cardsController.getAllCards); deleted for speed
router.get('/id/:id', cardsController.getCardById);
router.get('/name/:name', cardsController.getCardByName);

export default router;
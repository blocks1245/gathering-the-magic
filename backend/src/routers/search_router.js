import express from 'express';

import * as searchController from '../controllers/search_controller.js';

const router = express.Router();

// all routes for /search
router.post('/', searchController.search);

export default router;
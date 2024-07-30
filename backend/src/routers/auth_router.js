import express from 'express';

import * as authController from '../controllers/auth_controller.js';

const router = express.Router();

// all routes for /auth
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
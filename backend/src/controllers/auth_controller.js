import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as db from '../database/database_helper.js';

export async function login(req, res) {
    const { username, password } = req.body;
}

    // TODO: complete script i asked chatgpt for help

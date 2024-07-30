import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as db from '../database/database_helper.js';


export async function register(req, res) {
    const { username, password } = req.body;

    try {
        // check if user already exists
        const user = await db.getUserByUsername(username);
        if (user.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.addUser(username, hashedPassword);

        res.status(201).json({ msg: 'User registered' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Internal server error' });
    }
}


export async function login(req, res) {
    const { username, password } = req.body;

    const user = await db.getUserByUsername(username);
    if (user.length === 0) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
        return res.status(401).json({ msg: 'Unauthorized' });
    } else {
        const payload = {
            user: {
                id: user[0].username,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET || 'myVerySecretToken', { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }
            res.status(200).cookie('token', token, {httpOnly: true, secure: true}).json('Authorized');
        });
    }
}

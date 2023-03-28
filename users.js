const { Router } = require('express');
const pool = require('./db');

const users = Router();

users.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json({ data: rows })
    } catch (e) {
        res.sendStatus(404)
    }
})

module.exports = users;
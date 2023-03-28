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

users.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id])
        res.json({ data: rows })
    } catch (e) { res.sendStatus(404) }
})

module.exports = users;
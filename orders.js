const { Router } = require('express');
const pool = require('./db');

const orders = Router();

orders.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM orders');
        res.json({ data: rows })
    } catch (e) {
        res.sendStatus(404)
    }
})

orders.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id])
        res.json({ data: rows })
    } catch (e) { res.sendStatus(404) }
})

orders.post('/', async (req, res) => {
    const { price, date, user_id } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *', [price, date, user_id]);
        res.json({ data: rows })
    } catch (e) { res.sendStatus(403) }
})

module.exports = orders;
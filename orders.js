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

module.exports = orders;
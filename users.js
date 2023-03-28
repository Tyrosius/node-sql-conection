const { Router } = require('express');
const pool = require('./db');
const { body, validationResult } = require('express-validator');

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

users.get('/:id/orders', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id=$1', [id])
        res.json({ data: rows })
    } catch (e) { res.sendStatus(404) }
})

users.post('/',
    body('first_name').isLength({ min: 3, max: undefined }),
    body('last_name').isLength({ min: 3, max: undefined }),
    body('age').isInt(),
    body('active').isBoolean({ loose: true }),
    async (req, res) => {

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) { return res.status(400).json({ errors: validationErrors.array() }) }

        const { first_name, last_name, age, active } = req.body;
        try {
            const { rows } = await pool.query('INSERT INTO users (first_name, last_name,age,active) VALUES ($1,$2,$3,$4) RETURNING *', [first_name, last_name, age, active]);
            res.json({ data: rows })
        } catch (e) { res.sendStatus(403) }
    })

users.put('/:id',
    body('first_name').isLength({ min: 3, max: undefined }),
    async (req, res) => {

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) { return res.status(400).json({ errors: validationErrors.array() }) }

        const { id } = req.params;
        /* TODO check for data to be changed */
        const { first_name } = req.body;
        try {
            const { rows } = await pool.query('UPDATE users SET first_name=$1 WHERE id=$2 RETURNING *', [first_name, id]);
            res.json({ data: rows })
        } catch (e) { res.sendStatus(403) }
    })

users.put('/:id/check-inactive', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id=$1', [id])
        if (rows.length < 1) {
            const { newRows } = await pool.query('UPDATE users SET active=$1 WHERE id=$2', [false, id]);
            res.json({ message: `The user with id ${id} is set to inactive.` })
        } else { res.json({ messsage: `The user with id ${id} has already ordered at least once.` }) }

    } catch (e) { res.sendStatus(404) }
})

users.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM users WHERE id=$1', [id]);
        res.json({ message: `user with Id ${id} deleted.` })
    } catch (e) { res.sendStatus(403) }
})

module.exports = users;
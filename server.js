const express = require('express')
const server = express()
const users = require('./users')
const orders = require('./orders')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/', (req, res) => {
    res.send("Welcome to the Dreamers' Cantine")
});

server.use('/users', users);
server.use('/orders', orders);

module.exports = server;
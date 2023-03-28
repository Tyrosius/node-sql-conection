const { Pool } = require('pg');

const { EPGUSER, EPGHOST, EPGDATABASE, EPGPASSWORD, EPGPORT } = process.env

const pool = new Pool({
    user: EPGUSER,
    host: EPGHOST,
    database: EPGDATABASE,
    password: EPGPASSWORD,
    port: EPGPORT
    //oder als connectionstring
})

module.exports = pool;
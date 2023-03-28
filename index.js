require('dotenv').config();
const server = require('./server');
const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
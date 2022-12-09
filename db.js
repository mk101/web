const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'database',
    port: '5432',
    database: 'pizza_order'
})

module.exports = pool
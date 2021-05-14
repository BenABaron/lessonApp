const mysql = require('mysql')
require('dotenv').config();

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB
      })

      return this.pool
    }

    return this.pool
  }

}

const instance = new Connection()



module.exports = instance;
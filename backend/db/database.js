const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/umang.db', err => {
  if (err) {
    console.error('Failed to connect to DB:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});
module.exports = db;

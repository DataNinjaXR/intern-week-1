const db = require('./config/db');

db.query('SELECT 1 AS result')
  .then(([rows]) => {
    console.log('Database connection successful!');
    console.log(rows);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database connection failed!');
    console.error(error.message);
    process.exit(1);
  });
const mysql = require('mysql');

// Replace these with your actual MySQL database credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rrt'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database.');
  }
});

module.exports = connection;


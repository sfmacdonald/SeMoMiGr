// Include required modules
const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'myDB'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Perform SQL query
connection.query('SELECT id, firstname, lastname FROM MyGuests', (error, results, fields) => {
  if (error) throw error;
  // Output data of each row
  results.forEach((row) => {
    console.log(`id: ${row.id} - Name: ${row.firstname} ${row.lastname}`);
  });
});

// Close MySQL connection
connection.end((err) => {
  if (err) {
    console.error('Error closing MySQL connection: ' + err.stack);
    return;
  }
  console.log('MySQL connection closed.');
});

const express = require('express');
const mysql = require('mysql');

const app = express();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10 // Adjust as needed
});

// Middleware to acquire a MySQL connection from the pool
app.use((req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return next(err);
        }
        req.mysqlConnection = connection;
        next();
    });
});

// Middleware to release the MySQL connection back to the pool
app.use((req, res, next) => {
    if (!req.mysqlConnection) {
        return next(new Error('MySQL connection not available'));
    }
    req.mysqlConnection.release();
    next();
});

// Handle RSVP submission
app.post('/submit_rsvp', (req, res, next) => {
    const { name, email, response, party_size } = req.body;

    if (!name || !email || !response) {
        return res.status(400).send('Please fill in all required fields.');
    }

    req.mysqlConnection.query(
        'INSERT INTO rsvps (name, email, response, party_size) VALUES (?, ?, ?, ?)',
        [name, email, response, party_size],
        (error, results) => {
            if (error) {
                return next(error);
            }
            res.status(200).send('RSVP submitted successfully. Thank you!');
        }
    );
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

// Start the server
const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

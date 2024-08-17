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

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Middleware to release the MySQL connection back to the pool after response is sent
app.use((req, res, next) => {
    res.on('finish', () => {
        if (req.mysqlConnection) {
            req.mysqlConnection.release();
        }
    });
    next();
});

// Handle RSVP submission
app.post('/submit_rsvp', (req, res, next) => {
    const { name, email, response, party_size } = req.body;

    if (!name || !email || !response || !party_size) {
        return res.status(400).send('Please fill in all required fields.');
    }

    req.mysqlConnection.query(
        'SELECT id FROM attendees WHERE email = ?',
        [email],
        (error, results) => {
            if (error) {
                return next(error);
            }

            if (results.length > 0) {
                const attendeeId = results[0].id;

                req.mysqlConnection.query(
                    'UPDATE rsvps SET response = ?, party_size = ? WHERE attendee_id = ?',
                    [response, party_size, attendeeId],
                    (err, updateResults) => {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).send('RSVP updated successfully. Thank you!');
                    }
                );
            } else {
                req.mysqlConnection.query(
                    'INSERT INTO attendees (name, email, party_size) VALUES (?, ?, ?)',
                    [name, email, party_size],
                    (err, insertResults) => {
                        if (err) {
                            return next(err);
                        }
                        const attendeeId = insertResults.insertId;

                        req.mysqlConnection.query(
                            'INSERT INTO rsvps (attendee_id, response) VALUES (?, ?)',
                            [attendeeId, response],
                            (err, insertRsvpResults) => {
                                if (err) {
                                    return next(err);
                                }
                                res.status(200).send('RSVP submitted successfully. Thank you!');
                            }
                        );
                    }
                );
            }
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
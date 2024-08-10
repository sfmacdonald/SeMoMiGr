-- Drop the database if it exists to start fresh (optional)
DROP DATABASE IF EXISTS WeddingDB;

-- Create the database
CREATE DATABASE WeddingDB;

-- Use the newly created database
USE WeddingDB;
SHOW TABLES;
-- Create the attendees table
CREATE TABLE attendees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    party_size INT DEFAULT 1, -- Default party size to 1
    other_details TEXT
);

-- Create the rsvps table
CREATE TABLE rsvps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendee_id INT NOT NULL,
    response ENUM('Yes', 'No', 'Maybe') NOT NULL,
    FOREIGN KEY (attendee_id) REFERENCES attendees(id) ON DELETE CASCADE
);
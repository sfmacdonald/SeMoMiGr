DROP DATABASE IF EXISTS WeddingDB;
CREATE DATABASE WeddingDB;

USE WeddingDB;

CREATE TABLE attendees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    party_size INT, -- Allow NULL for party_size
    other_details TEXT
);

CREATE TABLE rsvps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendee_id INT NOT NULL,
    response ENUM('Yes', 'No', 'Maybe') NOT NULL,
    FOREIGN KEY (attendee_id) REFERENCES attendees(id)
);

-- Update party_size based on RSVP response
UPDATE attendees AS a
JOIN rsvps AS r ON a.id = r.attendee_id
SET a.party_size = CASE
    WHEN r.response = 'Yes' THEN 2  -- Assuming Jane Smith is bringing one guest
    ELSE NULL
END;
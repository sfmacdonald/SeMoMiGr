USE WeddingDB;

-- Insert attendees
INSERT INTO attendees (name, email, party_size, other_details) VALUES
('Sean MacDonald', 'seanfmacdonald@icloud.com', 4, 'Groom'),
('Jane Smith', 'janesmith@example.com', 2, 'Mother of Groom');

-- Insert RSVPs
INSERT INTO rsvps (attendee_id, response) VALUES
(1, 'Yes'),
(2, 'Yes');
-- Insert attendees
INSERT INTO attendees (name, email, other_details) VALUES
('Kelley MacDonald', 'john@example.com', 'Guest of honor'),
('Jane Smith', 'jane@example.com', 'Plus one');

-- Insert RSVPs
INSERT INTO rsvps (attendee_id, response) VALUES
(1, 'Yes'),
(2, 'No');

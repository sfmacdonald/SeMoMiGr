--GET all attendees and their responses:
SELECT a.name, a.email, r.response
FROM attendees a
LEFT JOIN rsvps r ON a.id = r.attendee_id;

--GET the count of attendees who have responded 'Yes':
SELECT COUNT(*) AS yes_count
FROM rsvps
WHERE response = 'Yes';

--GET the count of null responses:
SELECT COUNT(*) AS null_responses_count
FROM attendees
WHERE id NOT IN (SELECT attendee_id FROM rsvps);

-- View updated attendee information
SELECT * FROM attendees;
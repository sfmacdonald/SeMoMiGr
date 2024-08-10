USE WeddingDB;

-- Insert attendees
INSERT INTO attendees (name, email, party_size, other_details) VALUES
('Sean MacDonald', 'seanfmacdonald@icloud.com', 4, 'Groom'),
('Scott MacDonald', , 2, 'Father of Groom'),
('Kelley MacDonald', 'kelley_vt78@hotmail.com', 2, 'Mother of Groom'),
('Katherine Colquhoun', 'katherine.colquhoun@gmail.com', 3, 'Sister of Groom'),
('Jason Colquhoun', 'jason@designalaska.com', 3, 'BIL of Groom'),
('Pam West', 'pawestvt@icloud.com', 2, 'Aunt of Groom'),
('Bill West', 'williamwestvt@icloud.com', 2, 'Uncle of Groom'),
('Nick Vogel', 'nvogelpharmd@gmail.com', 4, 'Friend of Bride & Groom'),
('Randy Bunting', 'randybunting@gmail.com', 2, 'Father of Bride'),
('June Bunting', 'junecarterbunting@gmail.com', 2, 'Stepmother of Bride'),
('Brian Bunting', 'brianbunting@gmail.com', 2, 'Brother of Bride'),
('Missy Bunting', 'misserb82@yahoo.com', 2, 'Sister of Bride'),
('Ann-Clay Brough' '', 4, 'Friend of Bride & Groom'),
('Greg David', '', 3, 'Friend of Groom'),
('Stuart Wright', 'sfwbuilder@gmail.com', 2, 'Uncle of Groom'),
('Larry Voigtsberger', 'Lvdesign@mac.com', 2, 'Uncle of Groom'),
('Carrie Lorenzo', 'Lorenzoc1027@gmail.com', 2, 'Aunt of Groom'),
('Meg Bowser', '', 4, 'Aunt of Groom'),
('Ellen Wright', '', 1, 'Grandmother of Groom'),
('Jeff Marchese', 'jrdlfamily@gmail.com', 4, 'Friend of Bride & Groom'),
('Gary Rapanotti', 'surveyor@vermontel.net', 2, 'Friend of the Groom'),
('Abbey MacDonald', '', 1, 'Daughter of Groom'),
('Mary Jane Kolenda', '', 4, 'Cousin of Groom'),
('Bill DeVoe', '', 1, 'Grandfather of Groom'),
('Christina Smith', '', 5, 'Cousin of Groom');

-- Insert RSVPs
INSERT INTO rsvps (attendee_id, response) VALUES
(1, 'Yes'),
(2, 'Yes');
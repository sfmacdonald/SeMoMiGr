// Import required modules
const http = require('http');
const querystring = require('querystring');
const nodemailer = require('nodemailer');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Handle only POST requests
    if (req.method === 'POST') {
        let body = '';
        
        // Collect request data
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        // Process request data when all data is received
        req.on('end', () => {
            // Parse form data
            const formData = querystring.parse(body);
            
            // Retrieve form fields
            const name = formData.name;
            const email = formData.email;
            const response = formData.response;
            const partySize = formData.party_size;

            // Validate form data (you can add more validation here)
            if (!name || !email || !response) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Please fill in all required fields.');
                return;
            }

            // Insert data into the database (you'll need to implement this part)
            // ...

            // Send email notification
            const transporter = nodemailer.createTransport({
                service: 'your_email_service_provider',
                auth: {
                    user: 'your_email@example.com',
                    pass: 'your_email_password'
                }
            });

            const mailOptions = {
                from: 'your_email@example.com',
                to: ['seanfmacdonald@icloud.com', 'alisonlapham@live.com'],
                subject: 'New Wedding RSVP Submitted!',
                text: `A new RSVP for your wedding has been submitted:\n\nName: ${name}\nEmail: ${email}\nResponse: ${response}\nParty Size: ${partySize}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                } else {
                    console.log('Email sent:', info.response);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('RSVP submitted successfully. Thank you!');
                }
            });
        });
    } else {
        // Respond with Method Not Allowed for other request methods
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method Not Allowed');
    }
});

// Start the server and listen on a port
const PORT = process.env.PORT || 3307;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

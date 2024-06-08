const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submissions
app.post('/send_email', (req, res) => {
    const { phone, query } = req.body;

    // Validate phone number and query
    if (!isValidPhoneNumber(phone) || query.length < 10) {
        res.status(400).send('Invalid phone number or query length');
        return;
    }

    // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your.email@gmail.com', // Replace with your Gmail address
            pass: 'yourpassword' // Replace with your Gmail password
        }
    });

    // Email message configuration
    let mailOptions = {
        from: 'your.email@gmail.com', // Replace with your Gmail address
        to: 'recipient@example.com', // Replace with recipient email address
        subject: 'New Query from Interior Design Website',
        text: `Phone Number: ${phone}\n\nQuery:\n${query}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Sorry, something went wrong. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Your message has been sent successfully!');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function isValidPhoneNumber(phone) {
    // Simple phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

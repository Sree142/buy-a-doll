const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS) from the "public" directory
app.use(express.static(__dirname));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    console.log(name, email, message)

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'esending8@gmail.com',
                pass: 'devbfbzffteaitjj'
            }
        });

        const mailOptions = {
            from: 'esending8@gmail.com',
            to: 'esending8@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.send('Thank you for your message! We will get back to you soon.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred while sending your message.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

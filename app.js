const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express(); 
const PORT = 8080;
       
// Middleware 
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',   
    user: 'root', // Use your MySQL username
    password: 'root123', // Use your MySQL password
    database: 'abis'
}); 

db.connect((err) => { 
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
    
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const validPages = [
        'about',
        'index',
        'careers',
        'contact',
        'form',
        'gallery',
        'itsolutions',
        'team',
        'testimonial',
    ];   

    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, 'views', `${page}.html`));
    } else {
        res.status(404).send('Page not found');
    }
});

//for applications
app.post('/submit', (req, res) => {
    const {
        f_name,
        l_name,
        email_id,
        mobile_no,
        cover_letter,
        experience,
        start_date,
        terms_of_services
    } = req.body;

    const terms = terms_of_services === 'on' ? 1 : 0;

    const sql = `
        INSERT INTO applications (f_name, l_name, email_id, mobile_no, cover_letter, experience, start_date, terms_of_services)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [f_name, l_name, email_id, mobile_no, cover_letter, experience, start_date, terms], (err) => {
        if (err) {
            console.error(err);
            // Send response with failure alert
            return res.send(`
                <script>
                    alert('Submission failed or Already Applied. Please try again!!!');
                    window.location.href = '/form'; // Replace with the actual form page route
                </script>
            `);
        }
        // Send response with success alert
        res.send(`
            <script>
                alert('Your application has been successfully submitted!');
                window.location.href = '/careers'; // Replace with the actual form page route
            </script>
        `);
    });
});

//for Contack Message
// Ensure `path` is imported for file operations

app.post('/submitC', (req, res) => {
    const { name, email, subject, message } = req.body;

    const sql = `
        INSERT INTO contact_form (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, subject, message], (err) => {
        if (err) {
            console.error(err);
            // Send an HTML response with an alert for failure
            return res.send(`
                <script>
                    alert('Submission failed. Please try again.');
                    window.location.href = '/contact'; // Replace with the actual form page route
                </script>
            `);
        }
        // Send an HTML response with an alert for success
        res.send(`
            <script>
                alert('Your message has been successfully sent!');
                window.location.href = '/contact'; // Replace with the actual form page route
            </script>
        `);
    });
});



// Start Server 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 
      
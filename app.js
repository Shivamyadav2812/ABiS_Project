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
            return res.status(500).sendFile(path.join(__dirname,'views', 'fail.html'));
        }
        res.sendFile(path.join(__dirname, 'views', 'success.html'));
    });
});

// Start Server 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 
      
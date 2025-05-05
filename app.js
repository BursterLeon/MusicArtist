// Setup Express
const express = require('express');
// Setup MySQL
const mysql = require('mysql2');
const path = require('path');
//required for the encryption of the passwors
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


//information to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xotbax-wynMa5-fawsux',
  database: 'user_auth_db'
});
db.connect((err) => {
  if (err) {
    console.error('Connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database!');
});


// Route for the sign-up form
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Hash the password using bcrypt with 5 salt rounds
    const hashedPassword = await bcrypt.hash(password, 5);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error creating user: ' + err.message);
      return res.status(500).json({ message: 'Failed to create account.' });
    }

    console.log('User registered:', { username, email });
    res.status(200).json({ message: 'Account created successfully!' });
  });
});


// Route for the login form
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Both email and password are required.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Login error:', err.message);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
    //no user with the email
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
        res.status(200).json({ success: true, message: 'Login was successful!' });
      } else {
        // Passwords do not match
        res.status(401).json({ success: false, message: 'Wrong email or password.' });
      }
  });
});

//Route to the Contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const sql = 'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving message:', err.message);
      return res.status(500).json({ message: 'Failed to send message.' });
    }

    console.log('New message from contact form:', { name, email });
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
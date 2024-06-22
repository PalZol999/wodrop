const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); 
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'myapp',
  password: 'IBM999ibm!',
  port: 5432, 
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes for register
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const saltRounds = 6; // Number of salt rounds for bcrypt hashing

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
    const result = await pool.query(sql, [firstName, lastName, email, hashedPassword]);
    res.send('User registered');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Registration failed');
  }
});

// Routes for login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); 
const cors = require('cors');
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

// Routes
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
  try {
    const result = await pool.query(sql, [firstName, lastName, email, password]);
    res.send('User registered');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

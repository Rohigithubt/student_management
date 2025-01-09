const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',
  database: 'student_management',   
  password: 'Rohit@9549',   
  port: 5432,                  
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const query = 'SELECT password FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const resultPassword = result.rows[0].password;

    
    const isValid = password === resultPassword;

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});





app.post('/api/students', async (req, res) => {
  const { name, branch,semester,dateofbirth, email } = req.body;


  try {
    const query = 'INSERT INTO students (name, branch,semester,dateofbirth, email) VALUES ($1, $2, $3,$4,$5) RETURNING *';
    const values = [name, branch,semester,dateofbirth, email];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving student data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/students', async (req, res) => {
    try {
      const query = "SELECT name, branch,semester, TO_CHAR(dateofbirth, 'YYYY-MM-DD') as dateofbirth, email FROM students ORDER BY id ASC";
      const result = await pool.query(query);
      console.log(result.rows)
      res.status(200).json(result.rows); 
    } catch (error) {
      console.error('Error fetching student data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.delete('/api/students/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'DELETE FROM students WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Student deleted successfully', student: result.rows[0] });
    } catch (error) {
      console.error('Error deleting student data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, branch,semester,dateofbirth, email } = req.body;
  
    if (!name || !branch || !semester || !dateofbirth || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const query = 'UPDATE students SET name = $1, branch = $2, semester = $3 ,dateofbirth = $4 ,email=$5 WHERE id = $6 RETURNING *';
      const values = [name, branch,semester,dateofbirth, email,id];
      const result = await pool.query(query, values);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating student data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

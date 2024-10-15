const express = require('express');
const appWeb = express();
const appAPI = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');


appAPI.use(bodyParser.json());
appAPI.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'test'
});

db.connect((err) => {
  if (err) throw err; console.log('MySQL Connected...');
});

appWeb.get('/', (req, res) => {
  res.send('<h1>Welcome to Web Server</h1>');
});

appAPI.get('/api/data', (req, res) => {
  res.json({ message: 'This is API data' });
});

appAPI.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).send('Please provide all required fields.');
    }
  
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error registering user.');
      }
      res.status(200).send('User registered successfully.');
    });
});
  
appWeb.listen(3000, () => {
  console.log('Web server running on port 3000');
});

appAPI.listen(3001, () => {
  console.log('API server running on port 3001');
});

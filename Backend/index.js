const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend hoạt động OK!' });
});

// Ví dụ thêm: Lấy tất cả người dùng từ DB
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('✅ Backend hoạt động!');
});

app.listen(3000, () => {
  console.log('🚀 Backend chạy tại http://localhost:3000');
});

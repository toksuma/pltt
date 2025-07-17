const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const db = require('../db');

// Lấy thông tin profile user hiện tại
router.get("/profile", authenticate, (req, res) => {
  // Ví dụ: lấy user từ DB theo req.user.id
  const userId = req.user.id;
  // Thay đoạn dưới bằng truy vấn DB thực tế của bạn
  db.query("SELECT id, username, full_name, email, role, profile_image FROM users WHERE id = ?", [userId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: "Không tìm thấy user" });
    res.json(results[0]);
  });
});

// ... các route bạn đã có
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, email });
  });
});

module.exports = router;
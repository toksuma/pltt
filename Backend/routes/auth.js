const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = "your_secret_key"; 

// API đăng nhập, kiểm tra tài khoản, mật khẩu, trả về JWT token nếu thành công.

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Lỗi server" });
    if (results.length === 0) return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Log kiểm tra mật khẩu cho debug
    console.log("Mật khẩu người dùng nhập:", password);
    console.log("Mật khẩu trong DB (đã hash):", user.password);

    res.json({ token, role: user.role });
  });
});

module.exports = router;
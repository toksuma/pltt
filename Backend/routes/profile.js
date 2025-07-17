const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticate } = require("../middleware/auth");

// GET user profile
router.get("/", authenticate, (req, res) => {
  const userId = req.user.id;
  
  db.query(
    "SELECT id, username, role, email, full_name, profile_image, created_at FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi server" });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      }
      
      const user = results[0];
      res.json({
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email || "",
        fullName: user.full_name || "",
        profileImage: user.profile_image || "",
        createdAt: user.created_at
      });
    }
  );
});

// Cập nhật thông tin profile (ảnh đại diện hoặc mật khẩu)
router.put("/", authenticate, (req, res) => {
  const userId = req.user.id;
  const { profile_image, current_password, new_password } = req.body;

  // Đổi ảnh đại diện
  if (profile_image !== undefined) {
    db.query(
      "UPDATE users SET profile_image = ? WHERE id = ?",
      [profile_image, userId],
      (err) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        return res.json({ message: "Cập nhật ảnh đại diện thành công" });
      }
    );
    return;
  }

  // Đổi mật khẩu
  if (current_password && new_password) {
    db.query("SELECT password FROM users WHERE id = ?", [userId], (err, results) => {
      if (err || results.length === 0) return res.status(400).json({ error: "Không tìm thấy user" });
      const bcrypt = require("bcryptjs");
      const user = results[0];
      bcrypt.compare(current_password, user.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(400).json({ error: "Mật khẩu hiện tại không đúng" });
        bcrypt.hash(new_password, 10, (err, hash) => {
          if (err) return res.status(500).json({ error: "Lỗi server" });
          db.query("UPDATE users SET password = ? WHERE id = ?", [hash, userId], (err) => {
            if (err) return res.status(500).json({ error: "Lỗi server" });
            return res.json({ message: "Đổi mật khẩu thành công" });
          });
        });
      });
    });
    return;
  }

  res.status(400).json({ error: "Dữ liệu không hợp lệ" });
});

module.exports = router;
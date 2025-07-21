const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const db = require('../db');

// Quản lý tài khoản người dùng: lấy profile, danh sách user, tạo, sửa, xoá

/**
 * Lấy thông tin profile user hiện tại
 */
router.get("/profile", authenticate, (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT id, username, password, role, created_at, email, full_name, profile_image FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Lỗi server" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Không tìm thấy user" });
      }
      res.json(results[0]);
    }
  );
});

/**
 * Lấy danh sách tất cả user
 */
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results);
  });
});

/**
 * Tạo mới tài khoản user
 */
router.post("/", (req, res) => {
  const { username, password, email, full_name, profile_image, role } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: "Thiếu username, password hoặc email" });
  }
  const created_at = new Date();
  db.query(
    "INSERT INTO users (username, password, role, created_at, email, full_name, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [username, password, role || 'user', created_at, email, full_name || '', profile_image || ''],
    (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Lỗi server" });
      }
      res.json({ 
        id: result.insertId, 
        username, 
        email, 
        full_name, 
        profile_image, 
        role: role || 'user',
        created_at 
      });
    }
  );
});

/**
 * Xoá tài khoản user theo id
 */
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy user để xóa" });
    }
    res.json({ message: "Xóa tài khoản thành công!" });
  });
});

/**
 * Cập nhật thông tin user theo id
 */
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, full_name, profile_image, role } = req.body;
  db.query(
    "UPDATE users SET username = ?, email = ?, full_name = ?, profile_image = ?, role = ? WHERE id = ?",
    [username, email, full_name, profile_image, role, userId],
    (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Lỗi server" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy user để cập nhật" });
      }
      res.json({ message: "Cập nhật thông tin thành công!" });
    }
  );
});

module.exports = router;
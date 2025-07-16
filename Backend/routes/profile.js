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

// UPDATE user profile
router.put("/", authenticate, (req, res) => {
  const userId = req.user.id;
  const { email, fullName, profileImage } = req.body;
  
  db.query(
    "UPDATE users SET email = ?, full_name = ?, profile_image = ? WHERE id = ?",
    [email, fullName, profileImage, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi server" });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      }
      
      res.json({ message: "Cập nhật thông tin thành công" });
    }
  );
});

module.exports = router;
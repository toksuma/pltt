const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticate } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// Lấy thông tin profile user hiện tại
router.get("/", authenticate, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, username, role, created_at, email, full_name, profile_image FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("[DB error]", err);
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
        full_name: user.full_name || "",
        profile_image: user.profile_image || "",
        created_at: user.created_at
      });
    }
  );
});

// Cập nhật thông tin profile (ảnh đại diện hoặc mật khẩu)
router.put("/", authenticate, (req, res) => {
  const userId = req.user.id;
  const { profile_image, current_password, new_password } = req.body;

  // Log dữ liệu FE gửi lên
  console.log("[DEBUG] PUT /api/users/profile body:", req.body);

  // Cập nhật ảnh đại diện
  if (typeof profile_image !== "undefined") {
    // Xử lý: nếu chuỗi rỗng hoặc null thì set về NULL
    let value = null;
    if (profile_image !== null && typeof profile_image === "string" && profile_image.trim() !== "") {
      value = profile_image.trim();
    }
    db.query(
      "UPDATE users SET profile_image = ? WHERE id = ?",
      [value, userId],
      (err, result) => {
        if (err) {
          console.error("[DB error avatar]", err);
          return res.status(500).json({ error: "Lỗi server khi cập nhật ảnh đại diện" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Không tìm thấy người dùng để cập nhật" });
        }
        return res.json({ message: "Cập nhật ảnh đại diện thành công" });
      }
    );
    return;
  }

  // Đổi mật khẩu
  if (current_password && new_password) {
    if (typeof new_password !== "string" || new_password.length < 6) {
      return res.status(400).json({ error: "Mật khẩu mới phải có ít nhất 6 ký tự" });
    }
    db.query("SELECT password FROM users WHERE id = ?", [userId], (err, results) => {
      if (err) {
        console.error("[DB error get pass]", err);
        return res.status(500).json({ error: "Lỗi server" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Không tìm thấy user" });
      }
      const user = results[0];
      bcrypt.compare(current_password, user.password, (err, isMatch) => {
        if (err) {
          console.error("[Bcrypt error]", err);
          return res.status(500).json({ error: "Lỗi server" });
        }
        if (!isMatch) {
          return res.status(400).json({ error: "Mật khẩu hiện tại không đúng" });
        }
        bcrypt.hash(new_password, 10, (err, hash) => {
          if (err) {
            console.error("[Bcrypt hash error]", err);
            return res.status(500).json({ error: "Lỗi server" });
          }
          db.query("UPDATE users SET password = ? WHERE id = ?", [hash, userId], (err, result) => {
            if (err) {
              console.error("[DB error update pass]", err);
              return res.status(500).json({ error: "Lỗi server" });
            }
            if (result.affectedRows === 0) {
              return res.status(404).json({ error: "Không tìm thấy user để cập nhật" });
            }
            return res.json({ message: "Đổi mật khẩu thành công" });
          });
        });
      });
    });
    return;
  }

  // Không truyền đủ dữ liệu
  res.status(400).json({ error: "Dữ liệu không hợp lệ" });
});

module.exports = router;
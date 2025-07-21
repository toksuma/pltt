const express = require("express");
const router = express.Router();
const db = require("../db");

// API CRUD banners, hỗ trợ kích hoạt và cập nhật trạng thái.

// Lấy toàn bộ banner, sắp xếp mới nhất trước
router.get("/", (req, res) => {
  db.query("SELECT * FROM banners ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching banners" });
    res.json(results);
  });
});

// Lấy banner đang được kích hoạt (active = 1), lấy mới nhất nếu có nhiều
router.get("/active", (req, res) => {
  const sql = "SELECT * FROM banners WHERE active = 1 ORDER BY updated_at DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi server" });
    res.json(result[0]);
  });
});

// Thêm banner mới, nếu active = true thì tắt active tất cả banner khác trước khi thêm
router.post("/", (req, res) => {
  const { title, description, image_url, active, overlay_text, overlay_color } = req.body;

  const insertBanner = () => {
    db.query(
      "INSERT INTO banners (title, description, image_url, active, overlay_text, overlay_color) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image_url, active ? 1 : 0, overlay_text, overlay_color],
      (err) => {
        if (err) return res.status(500).json({ error: "Error adding banner" });
        res.json({ success: true });
      }
    );
  };

  if (active) {
    db.query("UPDATE banners SET active = 0", (err) => {
      if (err) return res.status(500).json({ error: "Error updating active status" });
      insertBanner();
    });
  } else {
    insertBanner();
  }
});

// Cập nhật banner theo ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, active, overlay_text, overlay_color } = req.body;

  const sql = `
    UPDATE banners SET 
      title = ?, 
      description = ?, 
      image_url = ?, 
      active = ?, 
      overlay_text = ?, 
      overlay_color = ?,
      updated_at = NOW()
    WHERE id = ?
  `;

  const values = [
    title,
    description,
    image_url,
    active ? 1 : 0,
    overlay_text,
    overlay_color,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Cập nhật thất bại" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Không tìm thấy banner" });
    res.json({ message: "Cập nhật thành công" });
  });
});

// Xoá banner theo ID
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM banners WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting banner" });
    res.json({ success: true });
  });
});

// Kích hoạt 1 banner (set active = 1), đồng thời tắt tất cả các banner khác (set active = 0)
router.put("/:id/activate", (req, res) => {
  db.query("UPDATE banners SET active = 0", (err) => {
    if (err) return res.status(500).json({ error: "Error updating banners" });
    db.query("UPDATE banners SET active = 1 WHERE id = ?", [req.params.id], (err2) => {
      if (err2) return res.status(500).json({ error: "Error activating banner" });
      res.json({ success: true });
    });
  });
});

module.exports = router;
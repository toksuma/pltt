// routes/articles.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔍 Lấy tất cả bài viết
router.get("/", (req, res) => {
  const sql = "SELECT * FROM articles ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy bài viết:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results);
  });
});

// 🔍 Lấy bài viết theo ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM articles WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy bài viết theo ID:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    res.json(results[0]);
  });
});

// ➕ Thêm bài viết
router.post("/", (req, res) => {
  const { title, content, description, image_url, author, additional_images } = req.body;

  console.log("📥 Nhận được:", req.body);

  const sql = `
    INSERT INTO articles (title, content, description, image_url, author, additional_images)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, content, description, image_url, author, additional_images], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi thêm bài viết:", err);
      return res.status(500).json({ error: "Lỗi thêm bài viết" });
    }
    res.status(201).json({ message: "✅ Thêm bài viết thành công", id: result.insertId });
  });
});

// ✏️ Cập nhật bài viết
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, description, image_url, author, additional_images } = req.body;

  const sql = `
    UPDATE articles SET 
      title = ?, content = ?, description = ?, image_url = ?, author = ?, additional_images = ?
    WHERE id = ?
  `;

  db.query(sql, [title, content, description, image_url, author, additional_images, id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi cập nhật bài viết:", err);
      return res.status(500).json({ error: "Lỗi cập nhật bài viết" });
    }
    res.json({ message: "✅ Cập nhật bài viết thành công" });
  });
});

// 🗑️ Xoá bài viết
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM articles WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xoá bài viết:", err);
      return res.status(500).json({ error: "Lỗi xoá bài viết" });
    }
    res.json({ message: "✅ Xoá bài viết thành công" });
  });
});

module.exports = router;

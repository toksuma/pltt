import express from "express";
import db from "../db.js";

const router = express.Router();

// Lấy tất cả banner
router.get("/", (req, res) => {
  db.query("SELECT * FROM banners ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching banners" });
    res.json(results);
  });
});

// Lấy banner đang active
router.get("/active", (req, res) => {
  const sql = "SELECT * FROM banners WHERE active = 1 ORDER BY updated_at DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi server" });
    res.json(result[0]);
  });
});

// Thêm banner mới
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

// Xoá banner
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM banners WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting banner" });
    res.json({ success: true });
  });
});

// Kích hoạt banner
router.put("/:id/activate", (req, res) => {
  db.query("UPDATE banners SET active = 0", (err) => {
    if (err) return res.status(500).json({ error: "Error updating banners" });
    db.query("UPDATE banners SET active = 1 WHERE id = ?", [req.params.id], (err2) => {
      if (err2) return res.status(500).json({ error: "Error activating banner" });
      res.json({ success: true });
    });
  });
});

export default router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET tất cả banners
router.get("/", (req, res) => {
  db.query("SELECT * FROM banners ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy tất cả banners:", err);
      return res.status(500).json({ error: "Lỗi khi lấy banner" });
    }
    res.json(results);
  });
});

// ✅ GET banner đang hoạt động
router.get("/active", (req, res) => {
  db.query(
    "SELECT * FROM banners WHERE active = 1 ORDER BY id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error("❌ Lỗi khi lấy banner active:", err);
        return res.status(500).json({ error: "Lỗi khi lấy banner active" });
      }
      res.json(results[0] || null);
    }
  );
});

// ✅ POST thêm banner (nếu active = true thì disable tất cả trước)
router.post("/", (req, res) => {
  const { title, description, image_url, active } = req.body;

  const insertBanner = () => {
    db.query(
      "INSERT INTO banners (title, description, image_url, active) VALUES (?, ?, ?, ?)",
      [title, description, image_url, active ? 1 : 0],
      (err) => {
        if (err) {
          console.error("❌ Lỗi khi thêm banner:", err);
          return res.status(500).json({ error: "Lỗi khi thêm banner" });
        }
        res.json({ success: true });
      }
    );
  };

  // Nếu đặt là banner active → tắt các cái khác trước rồi mới thêm
  if (active) {
    db.query("UPDATE banners SET active = 0", (err) => {
      if (err) {
        console.error("❌ Lỗi khi cập nhật trạng thái active:", err);
        return res.status(500).json({ error: "Lỗi khi cập nhật trạng thái" });
      }
      insertBanner();
    });
  } else {
    insertBanner();
  }
});

// ✅ DELETE banner theo id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM banners WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Lỗi khi xoá banner:", err);
      return res.status(500).json({ error: "Xoá banner thất bại" });
    }
    res.json({ success: true });
  });
});

router.put("/:id/activate", (req, res) => {
  const { id } = req.params;
  db.query("UPDATE banners SET active = 0", (err) => {
    if (err) return res.status(500).json(err);
    db.query("UPDATE banners SET active = 1 WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ success: true });
    });
  });
});

module.exports = router;

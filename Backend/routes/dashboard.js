const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS count FROM articles", (err, result1) => {
    if (err) return res.status(500).json({ error: "Lỗi truy vấn bài viết" });
    stats.articles = result1[0].count;

    db.query("SELECT COUNT(*) AS count FROM contacts", (err, result2) => {
      if (err) return res.status(500).json({ error: "Lỗi truy vấn liên hệ" });
      stats.contacts = result2[0].count;

      db.query("SELECT COUNT(*) AS count FROM admins", (err, result3) => {
        if (err) return res.status(500).json({ error: "Lỗi truy vấn admin" });
        stats.admins = result3[0].count;

        res.json(stats);
      });
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// Thống kê 
router.get("/", (req, res) => {
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM articles) AS total_articles,
      (SELECT COUNT(*) FROM contacts) AS total_contacts
  `;
  db.query(statsQuery, (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn dashboard stats:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(result[0]);
  });
});

// log hoạt động mới nhất
router.get("/recent", (req, res) => {
  const sql = "SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 5";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn activity_logs:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(result);
  });
});

module.exports = router;

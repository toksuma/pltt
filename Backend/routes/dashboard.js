const express = require("express");
const router = express.Router();
const db = require("../db");

// Lấy thống kê tổng quan
router.get("/", (req, res) => {
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM articles) AS total_articles,
      (SELECT COUNT(*) FROM contacts) AS total_contacts,
      (SELECT COUNT(*) FROM users) AS total_users
  `;

  db.query(statsQuery, (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn dashboard stats:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }

    if (result && result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({ total_articles: 0, total_contacts: 0, total_users: 0 });
    }
  });
});

module.exports = router;
// Lấy logs hoạt động gần đây
router.get("/recent", (req, res) => {
  const logsQuery = `
    SELECT * FROM activity_logs 
    ORDER BY created_at DESC 
    LIMIT 10
  `;

  db.query(logsQuery, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn logs hoạt động:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results);
  });
} );    
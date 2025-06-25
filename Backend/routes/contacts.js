const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi truy vấn contacts:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(result);
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn contacts:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(result);
  });
});
router.post("/", (req, res) => {
  const { name, phone, email, occupation, address, landing_code, message } = req.body;

  const sql = `
    INSERT INTO contacts (name, phone, email, occupation, address, landing_code, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, email, occupation, address, landing_code, message], (err, result) => {
    if (err) {
      console.error("Lỗi thêm liên hệ:", err);
      return res.status(500).json({ error: "Lỗi server khi lưu liên hệ." });
    }
    res.json({ message: " ửi liên hệ thành công!" });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// API CRUD interfaces & categories, sinh mã tự động, trả về đếm thể loại.

// 🔹 Tạo mã giao diện tự động
const getNextCode = (callback) => {
  db.query("SELECT MAX(CAST(code AS UNSIGNED)) AS maxCode FROM interfaces", (err, result) => {
    if (err) return callback(err);
    const next = result[0].maxCode ? result[0].maxCode + 1 : 1;
    callback(null, String(next));
  });
};

// 🔸 Lấy tất cả giao diện
router.get("/", (req, res) => {
  const sql = `
    SELECT interfaces.*, interface_categories.name AS category_name
    FROM interfaces
    LEFT JOIN interface_categories ON interfaces.category_id = interface_categories.id
    ORDER BY interfaces.id DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    res.json(result);
  });
});

// 🔸 Thêm giao diện
router.post("/", (req, res) => {
  const { name, url, category_id } = req.body;
  getNextCode((err, nextCode) => {
    if (err) return res.status(500).json({ error: "Lỗi tạo mã" });

    const sql = "INSERT INTO interfaces (name, url, category_id, code) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, url, category_id, nextCode], (err, result) => {
      if (err) return res.status(500).json({ error: "Lỗi thêm giao diện" });
      res.json({ message: "Thành công", id: result.insertId });
    });
  });
});

// 🔸 Cập nhật giao diện
router.put("/:id", (req, res) => {
  const { name, url, category_id } = req.body;
  const { id } = req.params;
  const sql = "UPDATE interfaces SET name=?, url=?, category_id=? WHERE id=?";
  db.query(sql, [name, url, category_id, id], (err) => {
    if (err) return res.status(500).json({ error: "Lỗi cập nhật" });
    res.json({ message: "Đã cập nhật" });
  });
});

// 🔸 Xoá giao diện
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM interfaces WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Lỗi xoá" });
    res.json({ message: "Đã xoá" });
  });
});

// 🔸 Lấy tất cả thể loại + đếm
router.get("/categories", (req, res) => {
  const sql = `
    SELECT c.*, COUNT(i.id) AS count
    FROM interface_categories c
    LEFT JOIN interfaces i ON i.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi khi lấy thể loại" });
    res.json(result);
  });
});

// Thêm thể loại
router.post("/categories", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO interface_categories (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi thêm thể loại" });
    res.json({ id: result.insertId });
  });
});

// Sửa thể loại
router.put("/categories/:id", (req, res) => {
  const { name } = req.body;
  db.query("UPDATE interface_categories SET name=? WHERE id=?", [name, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Lỗi cập nhật thể loại" });
    res.json({ message: "Đã cập nhật" });
  });
});

//  Xoá thể loại
router.delete("/categories/:id", (req, res) => {
  db.query("DELETE FROM interface_categories WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Lỗi xoá thể loại" });
    res.json({ message: "Đã xoá" });
  });
});

module.exports = router;
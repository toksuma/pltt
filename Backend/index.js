const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "pltt_news",
});

app.get("/api/articles", (req, res) => {
  db.query("SELECT * FROM articles ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Lỗi lấy bài viết" });
    res.json(results);
  });
});

app.get("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(results[0]);
  });
});

app.post("/api/articles", (req, res) => {
  const { title, content, description, image_url, author, additional_images } = req.body;
  db.query(
    `INSERT INTO articles (title, content, description, image_url, author, additional_images)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, content, description, image_url, author, additional_images],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Lỗi thêm bài viết" });
      res.status(201).json({ message: "✅ Thêm bài viết thành công", id: result.insertId });
    }
  );
});

app.put("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, description, image_url, author, additional_images } = req.body;
  db.query(
    `UPDATE articles SET title=?, content=?, description=?, image_url=?, author=?, additional_images=? WHERE id=?`,
    [title, content, description, image_url, author, additional_images, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Lỗi cập nhật bài viết" });
      res.json({ message: "✅ Cập nhật bài viết thành công" });
    }
  );
});

app.delete("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM articles WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Lỗi xoá bài viết" });
    res.json({ message: "✅ Xoá bài viết thành công" });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});

c
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

// API lấy tất cả bài viết
app.get("/api/articles", (req, res) => {
  const sql = "SELECT * FROM articles ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy bài viết:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(results);
  });
});

// API lấy bài viết theo ID
app.get("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    res.json(results[0]);
  });
});

// API thêm bài viết
app.post("/api/articles", (req, res) => {
  const { title, content, description, image_url, author, additional_images } = req.body;
  const sql = `
    INSERT INTO articles 
    (title, content, description, image_url, author, additional_images)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [title, content, description, image_url, author, additional_images],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi thêm bài viết:", err);
        return res.status(500).json({ error: "Lỗi thêm bài viết" });
      }
      res.status(201).json({ message: "✅ Thêm bài viết thành công", id: result.insertId });
    }
  );
});

// API cập nhật bài viết
app.put("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, description, image_url, author, additional_images } = req.body;

  const sql = `
    UPDATE articles SET 
      title = ?, content = ?, description = ?, image_url = ?, author = ?, additional_images = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [title, content, description, image_url, author, additional_images, id],
    (err) => {
      if (err) {
        console.error("❌ Lỗi cập nhật bài viết:", err);
        return res.status(500).json({ error: "Lỗi cập nhật" });
      }
      res.json({ message: "✅ Cập nhật bài viết thành công" });
    }
  );
});

// API xoá bài viết
app.delete("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM articles WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Lỗi xoá bài viết:", err);
      return res.status(500).json({ error: "Lỗi xoá" });
    }
    res.json({ message: "✅ Xoá bài viết thành công" });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});

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
  database: "pltt_news", // sửa đúng DB của bro
});

// Lấy danh sách bài viết
app.get("/api/articles", (req, res) => {
  const sql = "SELECT * FROM articles ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Lỗi lấy danh sách bài viết:", err);
      return res.status(500).json({ error: "Lỗi khi lấy bài viết" });
    }
    res.json(results);
  });
});

// Thêm bài viết mới
app.post("/api/articles", (req, res) => {
  const { title, content, image_url } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Thiếu tiêu đề hoặc nội dung" });
  }

  const sql = "INSERT INTO articles (title, content, image_url) VALUES (?, ?, ?)";
  db.query(sql, [title, content, image_url], (err, result) => {
    if (err) {
      console.error("❌ Lỗi thêm bài viết:", err);
      return res.status(500).json({ error: "Lỗi khi thêm bài viết" });
    }
    res.json({ id: result.insertId, title, content, image_url });
  });
});

// Cập nhật bài viết
app.put("/api/articles/:id", (req, res) => {
  const id = req.params.id;
  const { title, content, image_url } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Thiếu tiêu đề hoặc nội dung" });
  }

  const sql = "UPDATE articles SET title = ?, content = ?, image_url = ? WHERE id = ?";
  db.query(sql, [title, content, image_url, id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi cập nhật bài viết:", err);
      return res.status(500).json({ error: "Lỗi khi cập nhật bài viết" });
    }
    res.json({ message: "Đã cập nhật thành công" });
  });
});

// Xoá bài viết
app.delete("/api/articles/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM articles WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Lỗi xóa bài viết:", err);
      return res.status(500).json({ error: "Lỗi khi xóa bài viết" });
    }
    res.json({ message: "Đã xóa thành công" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
});

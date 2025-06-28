const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",       // đổi nếu khác
  database: "pltt_news",   // hoặc database bro đang dùng
});

db.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối CSDL:", err);
  } else {
    console.log("✅ Kết nối CSDL thành công");
  }
});

module.exports = db;
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",       // đổi dl
  database: "pltt_news",  
});

db.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối CSDL:", err);
  } else {
    console.log("✅ Kết nối CSDL thành công");
  }
});

module.exports = db;
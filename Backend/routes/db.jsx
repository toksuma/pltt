const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin", 
  database: "pltt_news", 
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối CSDL:", err);
  } else {
    console.log("Đã kết nối CSDL");
  }
});

module.exports = db;
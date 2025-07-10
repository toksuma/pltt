// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",         // Nếu bạn đặt mật khẩu thì điền vào đây
  database: "pltt_news" // Tên đúng của database
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Kết nối MySQL thất bại:", err.message);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
  }
});

module.exports = connection;

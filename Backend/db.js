// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',           // Thay bằng mật khẩu MySQL của bạn
  database: 'pltt_db'     // Đặt tên database tùy bạn
});

connection.connect(err => {
  if (err) {
    console.error('❌ Kết nối MySQL thất bại:', err);
  } else {
    console.log('✅ Kết nối MySQL thành công!');
  }
});

module.exports = connection;

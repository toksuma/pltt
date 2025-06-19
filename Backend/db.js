const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'pltt_db' // Bạn có thể sửa tên DB ở đây
});

db.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err);
  } else {
    console.log('✅ Đã kết nối MySQL!');
  }
});

module.exports = db;

// test-db.js
const db = require("./db");

db.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("❌ Lỗi truy vấn CSDL:", err.message);
  } else {
    console.log("✅ CSDL hoạt động OK:", results);
  }
});

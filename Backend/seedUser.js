const bcrypt = require("bcrypt");
const db = require("./db");

async function createUsers() {
  const adminPassword = await bcrypt.hash("admin123", 10); // ✅ phải hash
  const staffPassword = await bcrypt.hash("staff123", 10);

  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    ["admin", adminPassword, "admin"],
    (err) => {
      if (err) console.error("❌ Lỗi tạo admin:", err);
      else console.log("✅ Tạo admin thành công");
    }
  );

  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    ["staff1", staffPassword, "staff"],
    (err) => {
      if (err) console.error("❌ Lỗi tạo staff:", err);
      else console.log("✅ Tạo staff thành công");
    }
  );
}

createUsers();

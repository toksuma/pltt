const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./db"); // đảm bảo đường dẫn đúng

const secret = "your_jwt_secret";

app.use(cors());
app.use(express.json());

// Đăng nhập
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "Lỗi server" });
      if (result.length === 0)
        return res.status(401).json({ message: "Sai tài khoản" });

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Sai mật khẩu" });

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username, // ✅ đưa vào token
          role: user.role,
        },
        secret,
        { expiresIn: "1d" }
      );

      res.json({
        token,
        role: user.role,
        username: user.username, // ✅ gửi về username
      });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

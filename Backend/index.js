const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

const { authenticate, authorize } = require("./middleware/auth");
const db = require("./db");

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// ROUTES
app.use("/api/banners", require("./routes/banner"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/articles", require("./routes/articles"));

// ✅ AUTH – Đúng đường dẫn login sẽ là: http://localhost:5000/api/login
app.use("/api", require("./routes/auth"));

app.get("/api/admin-only", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Chỉ Admin mới thấy được" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});

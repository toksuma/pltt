const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware xác thực & phân quyền
const { authenticate, authorize } = require("./middleware/auth");

// Kết nối database
const db = require("./db");

// Middleware xử lý CORS và JSON body
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// --- ROUTES ---

// Routes cho chức năng quản trị
app.use("/api/banners", require("./routes/banner"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/articles", require("./routes/articles"));
app.use("/api/interfaces", require("./routes/interfaces"));

// Route lấy ảnh preview từ URL (crawl bằng cheerio)
const previewImageRoute = require("./routes/previewImage");
app.use("/api/preview-image", previewImageRoute);

// Auth: Đăng nhập, đăng ký, kiểm tra token
// Login URL: http://localhost:5000/api/login
app.use("/api", require("./routes/auth"));

// Profile: Quản lý thông tin cá nhân
app.use("/api/profile", require("./routes/profile"));

// Test route phân quyền: chỉ Admin được truy cập
app.get("/api/admin-only", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Chỉ Admin mới thấy được" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
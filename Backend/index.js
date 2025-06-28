const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const { authenticate, authorize } = require("./middleware/auth"); // ⬅️ IMPORT Ở ĐÂY
// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Kết nối CSDL
const db = require("./db");

// ROUTES
// ✅ Đổi từ "/api/banner" → "/api/banners"
const bannerRoutes = require("./routes/banner");
app.use("/api/banners", bannerRoutes);

// Các routes khác
const dashboardRoutes = require("./routes/dashboard");
const contactRoutes = require("./routes/contacts");
const articleRoutes = require("./routes/articles");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/articles", articleRoutes);

app.get("/api/admin-only", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Chỉ Admin mới thấy được" });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối CSDL
const db = require("./db");

// ROUTES
const dashboardRoutes = require("./routes/dashboard");
const contactRoutes = require("./routes/contacts");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contacts", contactRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});

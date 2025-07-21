const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

// Cung cấp middleware xác thực và phân quyền người dùng

// Middleware xác thực JWT
const authenticate = (req, res, next) => {
  // Lấy token từ header Authorization (dạng "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Không có token" });

  try {
    // Xác minh và giải mã token
    const decoded = jwt.verify(token, SECRET_KEY);
    // Kiểm tra id trong token (bắt buộc là số)
    if (!decoded.id || isNaN(decoded.id)) {
      return res.status(401).json({ error: "Token không hợp lệ: thiếu hoặc sai id" });
    }
    // Lưu thông tin user vào request, ép kiểu id về số
    req.user = { ...decoded, id: Number(decoded.id) };
    next();
  } catch (err) {
    // Token hết hạn hoặc không hợp lệ
    res.status(401).json({ error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." });
  }
};

// Middleware phân quyền theo role
const authorize = (role) => (req, res, next) => {
  // Kiểm tra quyền (role) của user
  if (req.user?.role !== role) {
    return res.status(403).json({ error: "Không có quyền truy cập" });
  }
  next();
};

module.exports = { authenticate, authorize };
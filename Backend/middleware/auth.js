// middleware/auth.js
const jwt = require("jsonwebtoken");
const secret = "your_jwt_secret"; // Để trong .env nếu muốn bảo mật hơn

// Kiểm tra người dùng đã đăng nhập chưa
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Chưa đăng nhập" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.user = decoded; // Gắn dữ liệu người dùng vào request
    next();
  });
}

// Phân quyền theo role
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Không đủ quyền" });
    }
    next();
  };
}

module.exports = { authenticate, authorize };

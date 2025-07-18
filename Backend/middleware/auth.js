const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Không có token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // Đảm bảo id là số, không phải chuỗi
    if (!decoded.id || isNaN(decoded.id)) {
      return res.status(401).json({ error: "Token không hợp lệ: thiếu hoặc sai id" });
    }
    req.user = { ...decoded, id: Number(decoded.id) }; // ép về số
    next();
  } catch (err) {
    res.status(401).json({ error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." });
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
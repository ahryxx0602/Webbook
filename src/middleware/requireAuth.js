const { verifyToken } = require("../utils/jwt");

// Middleware bảo vệ route
const requireAuth = (req, res, next) => {
  // 1. Kiểm tra session
  if (req.session.user) {
    req.user = req.session.user; // lưu thông tin user vào req.user
    return next();
  }

  // 2. Kiểm tra JWT cookie
  const token = req.cookies?.jwt;
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded; // lưu thông tin decoded token
      return next();
    }
  }

  // 3. Nếu không có session hay JWT → redirect về login
  return res.redirect("/login");
};

module.exports = { requireAuth };

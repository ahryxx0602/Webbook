const jwt = require("jsonwebtoken");

// Hàm tạo token cho user
const generateToken = (user) => {
  return jwt.sign(
    // Payload: dữ liệu nhúng vào token
    { id: user._id, role: user.role },

    // Secret key: dùng để ký token (bảo mật)
    process.env.JWT_SECRET,

    // Thời gian hết hạn token
    { expiresIn: "1h" }
  );
};

// Hàm kiểm tra/giải mã token
const verifyToken = (token) => {
  try {
    // Xác thực token với secret key
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // Nếu token sai hoặc hết hạn → trả về null
    return null;
  }
};

module.exports = { generateToken, verifyToken };

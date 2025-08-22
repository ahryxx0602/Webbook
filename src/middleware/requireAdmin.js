// middleware/requireAdmin.js
const requireAdmin = (req, res, next) => {
  // Kiểm tra xem session user có tồn tại không
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Kiểm tra role
  if (req.session.user.role !== "admin") {
    return res.status(403).send("Bạn không có quyền truy cập trang này!");
  }

  // Nếu là admin thì cho tiếp tục
  next();
};

module.exports = requireAdmin;

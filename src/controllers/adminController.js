const adminService = require("../services/adminService");

const adminController = {
  // Hiển thị trang dashboard admin
  dashboard: async (req, res) => {
    try {
      const users = await adminService.getAllUsers();
      const stats = {
        users: users.length,
        products: 0, // Placeholder, thay bằng service nếu có
        orders: 0, // Placeholder, thay bằng service nếu có
      };
      res.render("admin/dashboard", {
        title: "Admin Dashboard",
        stats,
        adminName: req.session.user?.name || "Admin",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Lỗi khi hiển thị dashboard admin!");
    }
  },

  // Hiển thị bảng quản lý người dùng
  showUsers: async (req, res) => {
    try {
      const users = await adminService.getAllUsers();
      res.render("admin/users", {
        title: "Quản lý người dùng",
        users,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Lỗi khi hiển thị bảng người dùng");
    }
  },

  // Các chức năng khác
};

module.exports = adminController;

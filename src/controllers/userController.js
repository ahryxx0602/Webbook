// src/controllers/userController.js
const userService = require("../services/userService");

const userController = {
  getProfile: async (req, res) => {
    try {
      // an toàn hơn: fallback từ req.user nếu middleware đã gán
      const userId = req.user?.id || req.session.user?.id;
      if (!userId) return res.redirect("/login");

      const user = await userService.getUserById(userId);
      return res.render("user/profile", {
        user,
        title: "User Profile",
        active: "profile",
      });
    } catch (err) {
      console.error(err);
      return res.redirect("/login");
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user?.id || req.session.user?.id;
      if (!userId) return res.redirect("/login");
      const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, // nếu readonly thì vẫn gửi về giá trị cũ, không sao
      };

      const updatedUser = await userService.updateUserProfile(userId, payload);

      // Cập nhật lại session (rút gọn bằng spread)
      req.session.user = {
        ...req.session.user,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      };

      // route của bạn đang dùng /profile
      return res.redirect("/profile");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Lỗi khi cập nhật thông tin!");
    }
  },
};

module.exports = userController;

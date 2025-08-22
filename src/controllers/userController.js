const userService = require("../services/userService");

const userController = {
  getDashboard: async (req, res) => {
    try {
      // Lấy thông tin user từ session
      const userId = req.session.user.id;
      const user = await userService.getUserById(userId);

      res.render("user/dashboard", { user, title: "User Dashboard" });
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const updatedUser = await userService.updateUserProfile(userId, req.body);

      // Cập nhật lại session
      req.session.user.firstName = updatedUser.firstName;
      req.session.user.lastName = updatedUser.lastName;
      req.session.user.email = updatedUser.email;

      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      res.send("Lỗi khi cập nhật thông tin!");
    }
  },
};

module.exports = userController;

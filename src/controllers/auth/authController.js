const bcrypt = require("bcrypt");
const User = require("../../models/user");
const authService = require("../../services/authService");
const { generateToken } = require("../../utils/jwt");

const authController = {
  // Register
  handleRegister: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      await authService.handleRegister({
        firstName,
        lastName,
        email,
        password,
      });
      res.redirect("/login");
    } catch (e) {
      console.log(e);
      res.send(e.message || "Lỗi khi đăng ký!");
    }
  }, // register
  handleLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      // get user + token
      const { user, token } = await authService.handleLogin({
        email,
        password,
      });
      // TODO: Session , JWT

      //Session:
      req.session.user = {
        id: user._id,
        role: user.role,
        name: user.firstName,
      };
      // Lưu JWT vào cookie
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

      if (user.role === "admin") {
        return res.redirect("/admin"); // Admin -> dashboard admin
      } else {
        return res.redirect("/dashboard"); // User -> dashboard user
      }
    } catch (e) {
      console.log(e);
      res.send(e.message || "Lỗi khi đăng nhập!");
    }
  }, //login
  logout: async (req, res) => {
    try {
      await authService.handleLogout(req, res);
      res.redirect("/login");
    } catch (err) {
      console.log(err);
      res.send("Lỗi khi logout!");
    }
  }, //logout
};

module.exports = authController;

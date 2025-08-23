const bcrypt = require("bcrypt");
const User = require("../../models/user");
const authService = require("../../services/authService");
const { generateToken } = require("../../utils/jwt");

const authController = {
  // Register
  handleRegister: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const missing = [];
      if (!firstName) missing.push("Vui lòng nhập Họ.");
      if (!lastName) missing.push("Vui lòng nhập Tên.");
      if (!email) missing.push("Vui lòng nhập Email.");
      if (!password) missing.push("Vui lòng nhập Mật khẩu.");

      if (missing.length) {
        req.flash("errors", missing);
        return res.redirect("/register");
      }

      await authService.handleRegister({
        firstName,
        lastName,
        email,
        password,
      });
      req.flash("success", "Đăng ký thành công. Hãy đăng nhập!");
      res.redirect("/login");
    } catch (e) {
      console.log(e);
      if (e.code === 11000 || /duplicate/i.test(e.message || "")) {
        req.flash("error", "Email đã tồn tại.");
      } else {
        req.flash("error", e.message || "Lỗi khi đăng ký!");
      }
      res.redirect("/register");
    }
  }, // register
  handleLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const remember = !!req.body.remember;
      if (!email || !password) {
        req.flash("error", "Vui lòng nhập đầy đủ Email và Mật khẩu.");
        return res.redirect("/login");
      }

      // get user + token
      const { user, token } = await authService.handleLogin({
        email,
        password,
      });
      if (!user || !token) {
        req.flash("error", "Email hoặc mật khẩu không đúng.");
        return res.redirect("/login");
      }
      // TODO: Session , JWT

      //Session:
      req.session.user = {
        id: user._id,
        role: user.role,
        name: user.firstName,
      };
      // Remember me
      if (remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        }); // 30 days
      } else {
        // Session là cookie phiên (hết khi đóng browser)
        req.session.cookie.expires = false;
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 2,
        }); //2hrs
      }
      req.flash("success", "Đăng nhập thành công!");
      if (user.role === "admin") {
        return res.redirect("/admin"); // Admin -> dashboard admin
      } else {
        return res.redirect("/dashboard"); // User -> dashboard user
      }
    } catch (e) {
      console.log(e);
      // Thông báo cho người dùng
      const msg = /password/i.test(e.message || "")
        ? "Mật khẩu không đúng."
        : /not\s*found|email|user/i.test(e.message || "")
        ? "Email chưa được đăng ký."
        : e.message || "Lỗi khi đăng nhập!";

      req.flash("error", msg);
      return res.redirect("/login");
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

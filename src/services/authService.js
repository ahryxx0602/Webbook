const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const authService = {
  handleRegister: async ({ firstName, lastName, email, password }) => {
    // Check email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email đã tồn tại!");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role: "user",
    });
    return await newUser.save();
  }, // register
  handleLogin: async ({ email, password }) => {
    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Không tìm thấy tài khoản!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Sai mật khẩu!");
    }
    // Create JWT
    const token = generateToken(user);
    return { user, token };
  }, //login
  handleLogout: (req, res) => {
    return new Promise((resolve, reject) => {
      try {
        // Hủy session
        req.session.destroy((err) => {
          if (err) {
            return reject(err);
          }
          // Xóa cookie JWT
          res.clearCookie("jwt");
          resolve(true);
        });
      } catch (err) {
        reject(err);
      }
    });
  }, //Logout
};

module.exports = authService;

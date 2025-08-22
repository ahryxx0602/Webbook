// src/services/adminService.js
const User = require("../models/user");

const adminService = {
  // Lấy tất cả user
  getAllUsers: async () => {
    try {
      // Lọc field: firstName, lastName, email
      const users = await User.find(
        {},
        { firstName: 1, lastName: 1, email: 1 }
      ).sort({ createdAt: -1 });
      return users;
    } catch (err) {
      throw new Error("Lỗi khi lấy danh sách user: " + err.message);
    }
  },
};

module.exports = adminService;

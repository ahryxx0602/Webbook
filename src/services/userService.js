const User = require("../models/user");

const userService = {
  getUserById: async (userId) => {
    return await User.findById(userId).select("-password"); // Không trả về password
  },

  updateUserProfile: async (userId, data) => {
    const { firstName, lastName, email } = data;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true } // Trả về document sau khi cập nhật
    );
    return updatedUser;
  },
};

module.exports = userService;

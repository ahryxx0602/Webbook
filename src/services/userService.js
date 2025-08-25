const User = require("../models/user");

const userService = {
  getUserById: async (userId) => {
    return await User.findById(userId).select("-password"); // Không trả về password
  },

  updateUserProfile: async (userId, data) => {
    const { firstName, lastName, email } = data;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(typeof firstName === "string"
            ? { firstName: firstName.trim() }
            : {}),
          ...(typeof lastName === "string"
            ? { lastName: lastName.trim() }
            : {}),
          ...(typeof email === "string" ? { email: email.trim() } : {}),
        },
      },
      { new: true, runValidators: true } // Trả về document sau khi cập nhật
    ).select("-password"); // Không trả về password
    return updatedUser;
  },
};

module.exports = userService;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Khai báo Schema cho User
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, // Tự động loại bỏ khoảng trắng ở đầu/cuối
    },
    lastName: {
      type: String,
      required: true,
      trim: true, // Tự động loại bỏ khoảng trắng ở đầu/cuối
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email không được trùng
      lowercase: true, // Tự động chuyển về chữ thường
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Mật khẩu tối thiểu 6 ký tự
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Chỉ cho phép 2 giá trị
      default: "user", // Mặc định là "user"
    },
  },
  { timestamps: true } // Tự động tạo createdAt và updatedAt
);

// Virtual field: fullName
userSchema
  .virtual("fullName")
  .get(function () {
    // Khi gọi user.fullName -> trả về "firstName lastName"
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    // Khi gán user.fullName = "Nguyen Van A"
    // => tự động tách thành firstName = "Nguyen", lastName = "Van A"
    const firstName = v.substring(0, v.indexOf(" "));
    const lastName = v.substring(v.indexOf(" ") + 1);
    this.set({ firstName, lastName });
  });

module.exports = mongoose.model("User", userSchema);

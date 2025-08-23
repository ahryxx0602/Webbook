const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth/authController");

//GET form login
router.get("/login", (req, res) => res.render("auth/login"));
// POST login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Email không hợp lệ"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  ],
  authController.handleLogin
);

router.get("/register", (req, res) => res.render("auth/register"));
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Vui lòng nhập tên"),
    body("email").trim().isEmail().withMessage("Email không hợp lệ"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  ],
  authController.handleRegister
);

router.get("/logout", authController.logout);

router.get("/", (req, res) => res.render("home"));

module.exports = router;

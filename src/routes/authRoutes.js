const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");

router.get("/login", (req, res) => res.render("auth/login"));
router.post("/login", authController.handleLogin);

router.get("/register", (req, res) => res.render("auth/register"));
router.post("/register", authController.handleRegister);

router.get("/logout", authController.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");
const userController = require("../controllers/userController");

// Trang profile user
// requireAuth để Check dùng cho người dùng đã đăng nhâpj
router.get("/profile", requireAuth, userController.getProfile);

// Update thông tin user
router.post("/update-profile", requireAuth, userController.updateProfile);

module.exports = router;

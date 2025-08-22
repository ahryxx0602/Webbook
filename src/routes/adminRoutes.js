const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware");
const adminController = require("../controllers/adminController");

const router = express.Router();
// Dashboard tổng
router.get("/admin", requireAdmin, adminController.dashboard);

// Route hiển thị bảng quản lý user
router.get("/admin/users", requireAdmin, adminController.showUsers);
module.exports = router;

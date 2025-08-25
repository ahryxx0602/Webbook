const express = require("express");
const path = require("path");
const sessionConfig = require("../config/session");
const { requireAuth } = require("./requireAuth");
const requireAdmin = require("./requireAdmin");
const flash = require("connect-flash");
const { randomAvatar } = require("../utils/avatar");

const setupMiddleware = (app) => {
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files
  app.use(express.static("src/public"));

  // Session
  sessionConfig(app);

  // flash messages
  app.use(flash());
  // Đưa flash ra view
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.errors = req.flash("errors"); // mảng lỗi từ validator
    next();
  });

  app.use((req, res, next) => {
    const user = req.session?.user;
    if (user) {
      res.locals.currentUser = {
        ...user,
        displayAvatar: randomAvatar(user, 40), // 40px cho navbar
      };
    } else {
      res.locals.currentUser = null;
    }
    next();
  });
};

module.exports = {
  setupMiddleware,
  requireAuth,
  requireAdmin,
};

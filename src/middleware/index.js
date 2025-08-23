const express = require("express");
const sessionConfig = require("../config/session");
const { requireAuth } = require("./requireAuth");
const requireAdmin = require("./requireAdmin");
const flash = require("connect-flash");

const setupMiddleware = (app) => {
  // Body parser
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
};

module.exports = {
  setupMiddleware,
  requireAuth,
  requireAdmin,
};

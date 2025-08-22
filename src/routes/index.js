const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

let route = express.Router();

let initWebRoutes = (app) => {
  app.use("/", authRoutes);
  app.use("/", userRoutes);
  app.use("/", adminRoutes);
};

module.exports = initWebRoutes;

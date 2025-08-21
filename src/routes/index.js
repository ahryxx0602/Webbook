const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

let route = express.Router();

let initWebRoutes = (app) => {
  app.use("/", authRoutes);
  app.use("/", userRoutes);
};

module.exports = initWebRoutes;

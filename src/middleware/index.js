const express = require("express");
const sessionConfig = require("../config/session");

const setupMiddleware = (app) => {
  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files
  app.use(express.static("src/public"));

  // Session
  sessionConfig(app);
};

module.exports = setupMiddleware;

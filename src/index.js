const express = require("express");
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/index");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const { setupMiddleware } = require("./middleware");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
setupMiddleware(app);

// Setup view engine
viewEngine(app);

// Setup routes
initWebRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

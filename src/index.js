//src/index
const express = require("express");
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/index");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const { setupMiddleware } = require("./middleware");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: { "img-src": ["'self'", "https:", "data:"] },
    },
  })
);

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

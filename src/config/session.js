const session = require("express-session");
const MongoStore = require("connect-mongo"); // Giúp lưu session vào Mongo

const sessionConfig = (app) => {
  app.use(
    session({
      // Chuỗi bí mật dùng để ký session ID (nên để trong .env)
      secret: process.env.SESSION_SECRET,
      // Nếu false thì chỉ lưu session khi có thay đổi

      // Nếu false thì chỉ lưu session khi có dữ liệu
      // Tránh tạo ra nhiều session rác trong DB
      resave: false,

      // Lưu session vào MongoDB thay vì RAM
      saveUninitialized: false,

      // Lưu session vào MongoDB thay vì RAM
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // Kết nối tới DB (đồng bộ với connectDB)
        collectionName: "sessions", // Collection chứa session
      }),

      // Cấu hình cookie được gửi về client
      cookie: {
        maxAge: 1000 * 60 * 60, // 1h
        httpOnly: true, // Chỉ server đọc được cookie, tăng bảo mật
      },
    })
  );
};
module.exports = sessionConfig;

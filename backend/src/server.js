import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initApiAdminRoutes from "./routes/apiAdmin";
import bodyParser from "body-parser";
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { connection } = require("./config/connectDB");

import cookieParser from "cookie-parser";
require("dotenv").config(); // giúp lấy các biến trong file .env

const app = express();
app.set("view engine", "ejs");

// config view engine
configViewEngine(app);

// config body-parser: thư viện lấy để lấy thông tin khi đẩy lên server
app.use(bodyParser.json());
// config cookie parse
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  // lưu trữ một thông tin định danh của người dùng vào session (userId) sau khi da login
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  // decode userId
  cb(null, obj);
});

// Define the CORS options
const corsOptions = {
  // có cho phép các đường link define bên dưới có được gửi cookie hay không.
  credentials: true,
  // define các đường link được gửi request đến server
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8080",
    "http://localhost:8081",
  ], // Whitelist the domains you want to allow
  method: "GET, POST, PUT, DELETE",
};
app.use(cors(corsOptions)); // Use the cors middleware with your options
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8081",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.setHeader('Access-Control-Allow-Origin', 'https://accounts.google.com/');

  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

// connection db
connection();

//init web route
// initWebRoutes(app);
initApiRoutes(app, passport);
initApiAdminRoutes(app);

//import swaggerUi from "swagger-ui-express";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("localhost ", PORT);
});

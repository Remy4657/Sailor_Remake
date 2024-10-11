import express from "express";
import configViewEngine from "./config/viewEngine";
// import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import initApiAdminRoutes from './routes/apiAdmin'
import bodyParser from "body-parser";
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
import { connection } from "./config/connectDB";
import { method } from "bluebird";
const cookieParser = require('cookie-parser');
require("dotenv").config(); // giúp lấy các biến trong file .env

const app = express();
app.set('view engine', 'ejs');

// config view engine
configViewEngine(app);

// config body-parser: thư viện lấy để lấy thông tin khi đẩy lên server
app.use(bodyParser.json());
// config cookie parse
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/*  Google AUTH  */
var userProfile;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '440076098403-0p5u9ddof8ig9ciagpvdv7q6h4e8jfac.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/v1/auth/google/callback/rm250320"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = { ...profile, accessToken: accessToken, refreshToken: refreshToken };
        return done(null, userProfile);
    }
));

// Define the CORS options
const corsOptions = {
    // có cho phép các đường link define bên dưới có được gửi cookie hay không.
    credentials: true,
    // define các đường link được gửi request đến server
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://accounts.google.com/'], // Whitelist the domains you want to allow
    method: "GET, POST, PUT, DELETE",

};
app.use(cors(corsOptions)); // Use the cors middleware with your options
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000', 'https://accounts.google.com/'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.setHeader('Access-Control-Allow-Origin', 'https://accounts.google.com/');

    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// connection db
connection();

//init web route
// initWebRoutes(app);
initApiRoutes(app, passport, userProfile);
initApiAdminRoutes(app)


/*  Google AUTH  */
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/api/v1/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/v1/auth/google/callback/rm250320',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        var a;
        console.log("userProfile: ", userProfile)
        // Successful authentication, redirect success.
        res.redirect('http://localhost:3000');
    });
app.get('/login-google', function (req, res) {
    res.render('pages/auth');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("localhost ", PORT);
});

// detEnv configuration
const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./src/routes/api");

const app = express();

// Security middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Other middlewares
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(
    cors({
        origin: "https://sabur-e-commerce-p-project-one-live.vercel.app",
        credentials: true,
    })
);

// Database connection
const url = process.env.DB_URL;

let options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    autoIndex: true,
    serverSelectionTimeoutMS: 50000,
};

mongoose
    .connect(url, options)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Backend!" });
});
app.use("/api/v1", router);

// Static files
app.use(express.static("client"));
app.use("/api/v1/get-file", express.static("uploads"));

module.exports = app;

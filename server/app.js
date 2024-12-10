const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const programRoutes = require("./routes/programRoutes");
const kemitraanRoutes = require("./routes/kemitraanRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const trashRoutes = require("./routes/trashRoutes");
const newsRoutes = require("./routes/newsRoutes");
const testimoniRoutes = require("./routes/testimoniRoutes");

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "*", // Ganti dengan URL frontend kamu
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware untuk body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware untuk menyajikan file dari folder "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Daftar Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/kemitraans", kemitraanRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/trashs", trashRoutes);
app.use("/api/newss", newsRoutes);
app.use("/api/testimonials", testimoniRoutes);

module.exports = app;

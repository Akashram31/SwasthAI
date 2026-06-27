require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");

const app = express();

// ======================================================
// Connect MongoDB
// ======================================================

connectDB();

// ======================================================
// Middleware
// ======================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================================================
// API Routes
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/assessment", assessmentRoutes);

// ======================================================
// Root Route
// ======================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SwasthAI Backend Server Running"
    });
});

// ======================================================
// Unknown Routes
// ======================================================

// ======================================================
// Unknown Routes
// ======================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ======================================================
// Global Error Handler
// ======================================================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// ======================================================
// Start Server
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
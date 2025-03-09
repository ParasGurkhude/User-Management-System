const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const logger = require("./middlewares/logger")

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/uploads", express.static("uploads"));
app.use(logger)

app.use("/api/auth", authRoutes)
app.use("api/users", userRoutes)
app.use("/api/admin")



connectDB();

module.exports = app
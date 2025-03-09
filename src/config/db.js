const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error: ", error)
    }
}

module.exports = connectDB
const express = require("express");
const { getAllUsers, getUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/userController")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")
const upload = require("../config/multer")

const router = express.Router()

router.get("/", authMiddleware , roleMiddleware(["Admin", "Guest"]), getAllUsers)
router.get("/me", authMiddleware, getUserProfile)
router.put("/me", authMiddleware, upload.single("profileImage"), updateUserProfile)
router.delete("/me", authMiddleware, deleteUserProfile)

module.exports = router
const express = require("express");
const {updateUserByAdmin, deleteUserByAdmin} = require("../controllers/adminController")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")


const router = express.Router()

router.put("/:id", authMiddleware, roleMiddleware(["Admin"]), updateUserProfile)
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]),  deleteUserProfile)

module.exports = router
const User = require ("../models/User")
const fs = require("fs")
const path = require("path");

const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find().select("-password")
    } catch (error) {
        res.status(500).json({message: "Error fetching users", error})
    }
}

const getUserProfile = async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) return res.status(404).json({ message: "Uses not found"})
        
        res.json(user)
    } catch (error) {
        res.status(500).json({message: "Error fetching users", error})
    }
}

const updateUserProfile = async (req, res)=>{
    try {
        const { name, email } = req.body;
        let updateFields = {}

        if(name) updateFields.name = name
        if(email) updateFields.email = email

        if(req.file){
            updateFields.profileImage = req.file.filename
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, {new: true}).select("-password")
        if(!updatedUser) return res.status(404).json({message: "User not found"})

            res.json(updatedUser)
    } catch (error) {
        res.status(500).json({message: "Error updating profile", error})
    }
}

const deleteUserProfile = async (req, res)=>{
    try {
        const user = await User.findById(req.user.id)
        if(!user) return res.status(404).json({message: "User not found"})
        
            if(user.profileImage) {
                const imagePath = path.join(__dirname, `../../uploads/${user.profileImage}`)
                if(fs.existsSync(imagePath)){
                    fs.unlinkSync(imagePath)
                }
            }

            await user.deleteOne()
            res.json({message: "User profile deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting profile", error})
    }
}

module.exports = { getAllUsers, getUserProfile, updateUserProfile, deleteUserProfile }
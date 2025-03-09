const User = require("../models/User")

const updateUserByAdmin = async (req, res)=>{
    try {
        const { name, email, role } = req.body;
        if(req.user.id === req.params.id && role && role !== "Admin"){
            return res.status(403).json({message: "You cannot change your own role"})
        }
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {name, email, role}, {new: true}).select("-password")
        if(!updatedUser) return res.status(403).json({message: "User not found"})
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({message: "Error updating profile", error})
    }
}

const deleteUserByAdmin = async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({message: "User not found"})

            await user.deleteOne()

            res.json({message: "User profile deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting profile", error})
    }
}

module.exports = {updateUserByAdmin, deleteUserByAdmin}
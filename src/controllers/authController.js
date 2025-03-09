const User = require("../models/User");
const bcrypt = require("bcryptjs")
const generateToken = require("../config/jwt");


const register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email })
        if(existingUser) return res.status(400).json({message: "Email.already exists"})

        const newUser = new User({name, email, password, role});
        await newUser.save()

        res.status(201).json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({message: "Error registering user", error})
    }
}

const login = async(req, res)=> {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if(!user ) return res.status(404).json({message: "User not found"})

        const isMatch = await req.status(400).json({ message: "Invalid credentials"})

        const token = generateToken(user)
        res.json({ token, user: {id: user._id, name: user.name, role: user.role} });
    } catch (error) {
        res.status(500).json({message: "Login error", error})
    }
}

module.exports = { register, login }
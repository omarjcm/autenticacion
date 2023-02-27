import jwt from "jsonwebtoken"
import User from "../models/User"
import Role from "../models/Role"
import { SECRET } from "../config"

export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body
    const newUser = new User({
        username,
        email,
        password: await User.encrypted_password(password)
    })

    const savedUser = await newUser.save()

    const token = jwt.sign({id:savedUser._id}, SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.status(200).json({token})
}

export const signIn = async (req, res) => {
    
}
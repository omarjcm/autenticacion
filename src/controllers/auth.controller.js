import jwt from "jsonwebtoken"
import User from "../models/User"
import Role from "../models/Role"
import config from "../config"

export const signUp = async (req, res) => {
    try {
        const {username, email, password, roles} = req.body
        const new_user = new User({ username, email, password })
        if (roles) {
            const found_roles = await Role.find({name: {$in: roles}})
            new_user.roles = found_roles.map( role => role._id )
        } else {
            const role = await Role.find({name: 'user'})
            new_user.roles = [role._id]
        }
        const saved_user = await new_user.save()
        const token = jwt.sign({ id:saved_user._id }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        })
        res.status(200).json({token})
    } catch(error) {
        console.log(error);
        return res.status(500).json({token: null, message: 'Internal server error'});
    }
}

export const signIn = async (req, res) => {
    try {
        const user_found = await User.findOne({email: req.body.email})

        if (!user_found) {
            return res.status(400).json( {message: 'User not found'} )
        }
        const verify_password = User.compare_password(req.body.password, user_found.password)
        if (!verify_password) {
            return res.status(401).json({token: null, message: 'Password invalido'})
        }
        const token = jwt.sign({id: user_found._id}, config.SECRET, {
            expiresIn: 86400 // 24 horas
        })
        res.status(200).json({token: token})
    } catch(error) {
        console.error( error )
        return res.status(500).json({token: null, message: 'Internal server error'});
    }
}
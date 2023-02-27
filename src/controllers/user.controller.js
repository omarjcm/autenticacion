import User from '../models/User'
import Role from '../models/Role'

export const createUser = async (req, res) => {
    try {
        const {username, email, password, roles} = req.body
        const roles_found = await Role.find({ name: {$in: roles} })
        
        const user = new User({ username, email, password, roles: roles_found.map( (role) => role._id ) })
        user.password = await User.encryptPassword(user.password)
        const saved_user = await user.save()

        return res.status(201).json({
            _id: saved_user._id,
            username: saved_user.username,
            email: saved_user.email,
            roles: saved_user.roles
        })
    } catch(error) {
        console.error(error)
    }
}

export const getUsers = async (req, res) => {
    const users = await User.find()
    return res.json(users)
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.userId)
    return res.json(user)
}
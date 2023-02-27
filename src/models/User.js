import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
}, {
    timestamps: true
})

userSchema.statics.encrypted_password = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.compare_password = async (password, received_password) => {
    return await bcrypt.compare(password, received_password)
}

userSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

export default mongoose.model('User', userSchema)
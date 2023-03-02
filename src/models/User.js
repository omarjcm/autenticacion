const mongoose = require('mongoose') 
const bcryptjs = require('bcryptjs') 

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    roles: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encrypted_password = (password) => {
    const salt = bcryptjs.genSaltSync()
    return bcryptjs.hashSync(password, salt)
}

userSchema.statics.compare_password = (password, received_password) => {
    return bcryptjs.compareSync(password, received_password)
}

userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    const salt = bcryptjs.genSaltSync()
    const hash = bcryptjs.hashSync(user.password, salt)
    user.password = hash
    next()
})

export default mongoose.model('User', userSchema)
import mongoose, { Schema } from "mongoose"

export const ROLES = ['user', 'admin', 'moderator']

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default mongoose.model('Role', roleSchema)
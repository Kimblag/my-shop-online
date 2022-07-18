import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
import User from '../interfaces/user.interfaces'



const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: [true, 'Name is required'] },
    lastname: { type: String, required: [true, 'Lastname is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    address: {
        country: { type: String },
        city: { type: String },
        street: { type: String },
        province: { type: String },
        zip: { type: String }
    },
    shippingAddress: {
        country: { type: String },
        city: { type: String },
        street: { type: String },
        province: { type: String },
        zip: { type: String }
    },
    favorites: [{}],
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String }
}, { timestamps: true })

userSchema.pre<User>('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    try {
        const salt: string | Error = await bcrypt.genSalt(10)
        const hash: string | Error = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } catch (error) {
        console.error(error)
    }
})

userSchema.methods.comparePassword = async function (password: string) {
    const user = this
    try {
        const isMatch: boolean = await bcrypt.compare(password, user.password)
        return isMatch
    } catch (error) {
        console.error(error)
    }
}

export default mongoose.model<User>('User', userSchema)
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
import { IPayment } from '../interfaces/payment.interfaces';
import IUser from '../interfaces/user.interfaces'

const paymentSchema = new mongoose.Schema<IPayment>({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true },
})

const userSchema = new mongoose.Schema<IUser>({
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
    payment: [paymentSchema],
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String }
}, { timestamps: true })

userSchema.pre<IUser>('save', async function (next) {
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

export default mongoose.model<IUser>('User', userSchema)
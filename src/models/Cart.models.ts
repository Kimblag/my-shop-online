import mongoose from 'mongoose'
import Cart from '../interfaces/cart.interfaces'

const cartSchema = new mongoose.Schema<Cart>({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 },
    }],
}, { timestamps: true })

export default mongoose.model<Cart>('Cart', cartSchema)
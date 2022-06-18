import mongoose from 'mongoose'
import ICart from '../interfaces/cart.interfaces'

const cartSchema = new mongoose.Schema<ICart>({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 },
    }],
}, { timestamps: true })

export default mongoose.model<ICart>('Cart', cartSchema)
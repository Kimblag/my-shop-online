import mongoose from 'mongoose'
import ICart from '../interfaces/Cart.interfaces'

const cartSchema = new mongoose.Schema<ICart>({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
    createdAt: { type: Date, required: true },
})

export default mongoose.model<ICart>('Cart', cartSchema)
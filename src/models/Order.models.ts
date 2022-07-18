import mongoose from 'mongoose'
import { Order } from '../interfaces/order.interfaces'

const orderSchema = new mongoose.Schema<Order>({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 },
    }],
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'cancelled'] },
}, { timestamps: true })

export default mongoose.model<Order>('Order', orderSchema)
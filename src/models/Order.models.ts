import mongoose from 'mongoose'
import { IOrder } from '../interfaces/order.interfaces'

const orderSchema = new mongoose.Schema<IOrder>({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
})
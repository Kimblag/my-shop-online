import { Request, RequestHandler, Response } from 'express'
import IServerResponse from '../interfaces/serverResponse.interfaces'
import OrdersModels from '../models/Order.models'

export const createOrderController: RequestHandler = async (req: Request, res: Response) => {
    const newOrder = new OrdersModels(req.body)
    try {
        const savedOrder = await newOrder.save()
        return res.status(201).send(<IServerResponse>({ status: 'success', data: savedOrder }))
    } catch (error: any) {
        return res.status(400).send(<IServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const updateOrderController: RequestHandler = async (req: Request, res: Response) => {
    try {
        await OrdersModels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        return res.status(200).send(<IServerResponse>({ status: 'success', message: 'Order updated' }))
    } catch (error: any) {
        return res.status(400).send(<IServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const deleteOrderController: RequestHandler = async (req: Request, res: Response) => {
    try {
        await OrdersModels.findByIdAndDelete(req.params.id)
        return res.status(200).send(<IServerResponse>({ status: 'success', message: 'Order deleted' }))
    } catch (error: any) {
        return res.status(400).send(<IServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const getOrderUserController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const orders = await OrdersModels.find({ userId: req.params.userId })
        orders.length > 0
            ? res.status(200).send(<IServerResponse>({ status: 'success', data: orders }))
            : res.status(404).send(<IServerResponse>({ status: 'error', message: 'No orders found' }))
    } catch (error: any) {
        return res.status(400).send(<IServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const getOrdersController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const orders = await OrdersModels.find()
        return res.status(200).send(<IServerResponse>({ status: 'success', data: orders }))
    } catch (error: any) {
        return res.status(400).send(<IServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const getIncomeController: RequestHandler = async (req: Request, res: Response) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previuosMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await OrdersModels.aggregate([
            { $match: { $and: [{ createdAt: { $gte: previuosMonth } }, { status: "completed" }] } },
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$sales" } } },
        ])
        return res.status(200).send(<IServerResponse>({ status: 'success', data: income }))
    } catch (error: any) {
        return res.status(400).send(<IServerResponse>({ status: 'error', message: error.message || error }))
    }
}
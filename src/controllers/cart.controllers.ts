import { Request, RequestHandler, Response } from 'express'
import ServerResponse from '../interfaces/serverResponse.interfaces'
import CartModels from '../models/Cart.models'

export const createCartController: RequestHandler = async (req: Request, res: Response) => {
    const newCart = new CartModels(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(201).send(<ServerResponse>({ status: 'success', data: savedCart }))
    } catch (error: any) {
        return res.status(error.status || 500).send(<ServerResponse>({ status: 'failed', errors: { message: error.message || error } }))
    }
}

export const updateCartController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const updateCart = await CartModels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(<ServerResponse>({ status: 'success', data: updateCart }))
    } catch (error: any) {
        return res.status(error.status || 500).send(<ServerResponse>({ status: 'failed', errors: { message: error.message || error } }))
    }
}

export const deleteCartController: RequestHandler = async (req: Request, res: Response) => {
    try {
        await CartModels.findByIdAndDelete(req.params.id)
        res.status(200).send(<ServerResponse>({ status: 'success', data: { message: 'Cart deleted.' } }))
    } catch (error: any) {
        return res.status(error.status || 500).send(<ServerResponse>({ status: 'failed', errors: { message: error.message || error } }))
    }
}

export const getCartController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const cart = await CartModels.findById(req.params.id)
        res.status(200).send(<ServerResponse>({ status: 'success', data: cart }))
    } catch (error: any) {
        return res.status(error.status || 500).send(<ServerResponse>({ status: 'failed', errors: { message: error.message || error } }))
    }
}

export const getAllCartsController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const carts = await CartModels.find()
        res.status(200).send(<ServerResponse>({ status: 'success', data: carts }))
    } catch (error: any) {
        return res.status(error.status || 500).send(<ServerResponse>({ status: 'failed', errors: { message: error.message || error } }))
    }
}
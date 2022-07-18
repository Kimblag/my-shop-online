import { Request, Response } from "express"
import ServerResponse from "../interfaces/serverResponse.interfaces"
import WishListModels from "../models/WishList.models"

export const addFavorite = async (req: Request, res: Response) => {
    const newFavourite = new WishListModels(req.body)
    try {
        const savedFavourite = await newFavourite.save()
        return res.status(201).send(<ServerResponse>({ status: 'success', data: savedFavourite }))

    } catch (error: any) {
        return res.status(400).send(<ServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const removeFavorite = async (req: Request, res: Response) => {
    try {
        console.log(req.body.id)
        //enviar id del documento wishlist agregado
        await WishListModels.findByIdAndDelete(req.body.id)
        return res.status(200).send(<ServerResponse>({ status: 'success', message: 'Product Deleted' }))
    } catch (error: any) {
        return res.status(400).send(<ServerResponse>({ status: 'error', message: error.message || error }))
    }
}

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const userWishlist = await WishListModels.find({userId: req.params.userId})
        return res.status(200).send(<ServerResponse>({ status: 'success', data: userWishlist }))
    } catch (error: any) {
        return res.status(400).send(<ServerResponse>({ status: 'error', message: error.message || error }))
    }
}
import console from 'console';
import { NextFunction, Request, Response } from 'express'
import UsersModels from '../models/Users.models'

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UsersModels.findOne({ email: req.body.email });
        if (user?.isVerified) {
            next()
        } else {
            return res.status(400).send('Must verify your email')
        }
    } catch (error: any) {
        console.error(error)
    }
}

export default verifyEmail
import {Request, Response} from 'express'
import UsersModels from '../models/Users.models'
import dotenv from 'dotenv'
dotenv.config()

export const verifyEmailcontroller = async (req: Request, res: Response) =>{
    try {
        const user = await UsersModels.findById(req.query.id)
        if(user){
            user.isVerified = true
            await user.save()
            return res.status(200).redirect(`${process.env.CORS_URL}`)
        } else{
            res.redirect(`${process.env.CORS_URL}`) //!Open login form in front
        }
    } catch (error) {
        console.error(error)        
    }
}

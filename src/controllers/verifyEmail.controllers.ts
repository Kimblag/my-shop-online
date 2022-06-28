import {Request, Response} from 'express'
import UsersModels from '../models/Users.models'

export const verifyEmailcontroller = async (req: Request, res: Response) =>{
    try {
        const user = await UsersModels.findById(req.query.id)
        if(user){
            user.isVerified = true
            await user.save()
            return res.status(200).redirect('http://localhost:3000/')
        } else{
            res.redirect('http://localhost:3000/') //!Open login form in front
        }
    } catch (error) {
        console.error(error)        
    }
}

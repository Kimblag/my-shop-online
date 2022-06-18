import { Request } from 'express'
import IUser from '../interfaces/user.interfaces'
import UsersModels from '../models/Users.models'

export const updatePasswordService = async (password: string, id: string): Promise<any> => {
    try {
        UsersModels.findById(id, async (err: any, result: any) => {
            if (err) return false
            result.password = password
            await result.save()
        })
    } catch (error) {
        throw error
    }
}

export const updatePersonalDataService = async (req: Request, id: string) => {
    try {
        const query = { _id: id }
        const update: IUser = req.body
        
        UsersModels.findOneAndUpdate(query, update, (err: any, result: any) => {
            if (err) return false
            return result
        })
    } catch (error) {
        throw error
    }
}
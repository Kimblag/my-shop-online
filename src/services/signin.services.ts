import User from '../interfaces/user.interfaces'
import UsersModels from '../models/Users.models'
import config from '../config'

export const getUserService = async (email: string): Promise<any> => {
    try {
        const user = await UsersModels.findOne({ email: email })
        return user
    } catch (error) {
        throw(error)
    }
}

export const matchPasswordService = async (user: User, password: string): Promise<boolean> => {
    try {
        const isMatch: boolean = await user.comparePassword(password)
        return isMatch
    } catch (error) {
        throw(error)
    }
}
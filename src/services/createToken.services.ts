import IUser from "../interfaces/user.interfaces"
import jwt from "jsonwebtoken";
import config from '../config'

export const createToken = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email }, config.JWT.SECRET, { expiresIn: "24h" })
}
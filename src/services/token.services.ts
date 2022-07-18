import User from "../interfaces/user.interfaces"
import jwt from "jsonwebtoken";
import config from '../config'


export const createTokenService = (user: User) => {
    return jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, config.JWT.SECRET, { expiresIn: "24h" })
}



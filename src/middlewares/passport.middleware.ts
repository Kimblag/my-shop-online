import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import UsersModels from '../models/Products.models'
import config from '../config'

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT.SECRET
}
export default new Strategy(options, async (payload, done) => {
    try {
        const user = await UsersModels.findById(payload.id);
        if (user) {
            return done(null, user)
        }
        return done(null, false)
    } catch (error) {
        console.error(error)
    }
})
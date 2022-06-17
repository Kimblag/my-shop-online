import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/index.routes'
import passport from 'passport'

import passportMiddleware from './middlewares/passport.middleware'

const app: Application = express()

// Settings
app.set('port', process.env.PORT || 3001)

//middlewares
app.use(morgan("dev"))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

app.use('/api', routes)



export default app
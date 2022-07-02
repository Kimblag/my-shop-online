import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/index.routes'
import passport from 'passport'

import passportMiddleware from './middlewares/passport.middleware'

const app: Application = express()

// Settings
app.set('port', process.env.PORT || 3001)

let ALLOWED_ORIGINS = [
    "https://my-shop-online.vercel.app",
    "http://localhost:3000",
  ];
//middlewares
app.use(morgan("dev"))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set("trust proxy", 1);
app.use((req, res, next) => {
    let origin = req.headers.origin as string;
      let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
    res.header("Access-Control-Allow-Origin", theOrigin); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
app.use(passport.initialize())
passport.use(passportMiddleware)

app.use('/api', routes)



export default app
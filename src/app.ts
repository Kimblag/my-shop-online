import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.routes';

const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', routes);



export default app;
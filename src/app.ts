import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productsRoutes from './routes/products.routes';

const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', productsRoutes);



export default app;
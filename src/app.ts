import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Settings
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(morgan("dev"));
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/api', (req, res) =>{
    res.send('Hello World');
})



export default app;
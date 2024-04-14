import express from  'express';
import {config} from "dotenv";
import cors from "cors";

import indexRouter from './routes/index.js';
import emailRouter from "./routes/email.js";
import authenticator from "./middleware/authenticator.js";

//.env Config
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = {
    origin: process.env.ALLOWED_ORIGIN
}
app.use(cors(allowedOrigins));

//Middlewares
app.use(authenticator);
//Routes
app.use('/', indexRouter);
app.use('/email', emailRouter);

const port = process.env.APP_PORT;


app.listen(port,()=>{
    console.log(`Listening on PORT ${port}`)
})
export default app;

import dotenv from 'dotenv';
import dbConnection from "./database/dbConnection.js";
import express, { urlencoded } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config({
    path: './.env'
})

const app = express();
const PORT = process.env.PORT || 5000;


dbConnection().then(() => {
    try {
        app.listen(PORT, async () => {
            console.log(`🌐 Server is running on ${PORT}`);
        })
    } catch (e) {
        console.log(`❌ Server was failed to connect due to error: ${e}`)
    }
});

//middlewares
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/v1', userRoutes);
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalH } from './middleware/global.error.js';
import { errorH } from './middleware/errorH.js';
import routes from './routes/user.route.js';

import router from './routes/admin.route.js'

dotenv.config();
const p = process.env.PORT;
const app = express();
app.use(cookieParser());



app.use(express.static("public"));

app.use(cors({
    origin : ["http://127.0.0.1:5501", "http://localhost:5501","https://backend-projectu.onrender.com"],
    credentials : true
}))

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/admin', router);
app.use('/api/users',routes);
app.use(globalH);
app.use(errorH);

connectDB();
app.listen(p , () => console.log(`Running at port ${p}`));
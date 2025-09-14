import express, { Application } from 'express';
// load dotnev
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './lib/db';
import bodyParser from 'body-parser';
import errorHandle from './middlewares/error-handle';
import studentRoute from './routes/student.route';
import managerRoute from './routes/manager.route';
import courseRoute from './routes/course.route';
import categoryRoute from './routes/category.route';
import cookieParser from 'cookie-parser';
import adminRoute from './routes/admin.route';
import contentRoute from './routes/content.route';
import bundleRoute from './routes/bundle.route';
import transactionRoute from './routes/transaction.route';
import cors from 'cors';
import authRoute from './routes/auth.route';
import path from 'path';


// intialize express
const app: Application = express();
// port
const PORT = process.env.PORT || 3000;



// initialize cors
app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

// body parse 
app.use(bodyParser.json())

// body parse encoded
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());



// start server & koneksi db 
const startServer = async () => {
    await connectDB();


    // check
    app.get('/home', (req, res) => {
        res.send('Hello World!')
    })



    // auth route
    app.use('/api', authRoute);

    // student route
    app.use('/api/student', studentRoute);

    // admin route
    app.use('/api/admin', adminRoute);

    // manager route
    app.use('/api/manager', managerRoute);

    // course route
    app.use('/api/course', courseRoute);

    // category route
    app.use('/api/category', categoryRoute);

    // content route
    app.use('/api', contentRoute);

    // bundle route
    app.use('/api/bundle', bundleRoute);

    // payment 
    app.use('/api/payment', transactionRoute);

    // / expose folder "public" sebagai static
    app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));




    // erro handle 
    app.use(errorHandle);


    // start the server 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}

// start server
startServer();

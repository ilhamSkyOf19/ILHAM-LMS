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



// intialize express
const app: Application = express();
// port
const PORT = process.env.PORT || 3000;




// body parse 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



// start server & koneksi db 
const startServer = async () => {
    await connectDB();


    // check
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    // student route
    app.use('/api/student', studentRoute);
    app.use('/api/manager', managerRoute);
    app.use('/api/course', courseRoute);


    // erro handle 
    app.use(errorHandle);


    // start the server 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}

// start server
startServer();

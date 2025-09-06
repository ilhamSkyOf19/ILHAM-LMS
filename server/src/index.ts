import express, { Application } from 'express';

// load dotnev
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();



// intialize express
const app: Application = express();
// port
const PORT = process.env.PORT || 3000;




// body parse 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



// check
app.get('/', (req, res) => {
    res.send('Hello World!')
})


// start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
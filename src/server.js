import express from "express";
import bodyParser from "body-parser";
import connectDB from './config/connectDB'
import initRoutes from "./routes";
const cors = require('cors')
require('dotenv').config();

const app = express();
console.log(process.env.REACT_APP_FRONTEND_URL)
app.use(cors({
    origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
    // credentials: true,
    // optionSuccessStatus: 200
}));

const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' });
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 10, type: 'application/x-www-form-urlencoded' });
app.use(jsonParser);
app.use(urlencodedParser);

//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))


initRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})

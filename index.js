const express=require('express');
const app = express();
const dotenv=require('dotenv');
const connectToDB = require('./config/database');
dotenv.config({path:'./config/config.env'});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const apiRouter = require('./api/api');
const authRouter = require('./api/auth');

app.use('/api', apiRouter);
app.use('/auth', authRouter);

connectToDB();
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port:",process.env.PORT);
})
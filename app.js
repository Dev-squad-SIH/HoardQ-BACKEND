const express=require('express');
const dotenv=require('dotenv');
const connectToDB = require('./config/database');
dotenv.config({path:'./config/config.env'});

const app=express();
connectToDB();
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port:",process.env.PORT);
})
const express=require('express');
const app=express();
const dotenv=require('dotenv');
const connectToDB = require('./config/database');
dotenv.config({path:'./config/config.env'});
const question=require('./routes/questionRouter');
const pdfGenerate=require('./routes/pdfGeneration');
const bodyParser=require('body-parser');

connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1',question);
app.use('/api/v2',pdfGenerate);
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port:",process.env.PORT);
})
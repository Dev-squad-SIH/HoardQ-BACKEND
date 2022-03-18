const express=require('express');
const app = express();
const dotenv=require('dotenv');
const connectToDB = require('./config/database');
dotenv.config({path:'./config/config.env'});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const apiRouter = require('./api/api');
const authRouter = require('./api/auth');
const pdfGenerate=require('./api/routes/pdfGenerateRoute');

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/api/v1',pdfGenerate);

connectToDB();
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port:",process.env.PORT);
})
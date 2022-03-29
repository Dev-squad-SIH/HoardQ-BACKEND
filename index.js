const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const connectToDB = require('./config/database');
dotenv.config({ path: './config/.env' });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
const apiRouter = require('./api/api');
const authRouter = require('./api/auth');

app.get('/', (req, res) => {
    res.send('HoardQ Backend')
})
app.use('/api', apiRouter);
app.use('/auth', authRouter);


connectToDB();
app.listen(process.env.PORT, () => {
    console.log("Server is running on port:", process.env.PORT);
})
const auth = require('express').Router();

const loginRouter = require('./routes/expertLogin.js');
auth.use('/login',loginRouter);

module.exports = auth;
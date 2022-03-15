const api = require('express').Router();

const addQuestionRouter = require('./routes/addQuestions.js');
api.use('/questions',addQuestionRouter);

module.exports = api;
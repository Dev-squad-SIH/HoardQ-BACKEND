const api = require('express').Router();

const { pdfGenerate } = require('../controllers/pdfGenerateController.js');
const addQuestionRouter = require('./routes/addQuestions.js');
const getQuestionRouter = require('./routes/getQuestions.js');
const expertDetailsRouter = require('./routes/expertDetails.js');
const expertQuestionsRouter = require('./routes/getExpertQuestions.js');
api.use('/expertQuestions',expertQuestionsRouter);
api.use('/expertDetails',expertDetailsRouter);
api.use('/questions',addQuestionRouter);
api.use('/pdfGenerate',pdfGenerate);
api.use('/get-questions',getQuestionRouter);

module.exports = api;
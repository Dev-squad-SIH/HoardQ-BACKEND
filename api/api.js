const api = require('express').Router();

const  pdfGenerate  = require('./routes/pdfGenerateRoute');
const addQuestionRouter = require('./routes/addQuestions.js');
const getExpertQuestions=require('./routes/getExpertQuestion');

api.use('/questions',addQuestionRouter);
api.use('/pdfGenerate',pdfGenerate);
api.use('/getExpertQuestions',getExpertQuestions);

module.exports = api;
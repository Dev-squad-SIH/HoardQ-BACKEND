const api = require('express').Router();

const { pdfGenerate } = require('../controllers/pdfGenerateController.js');
const addQuestionRouter = require('./routes/addQuestions.js');
api.use('/questions',addQuestionRouter);
api.use('/pdfGenerate',pdfGenerate);
module.exports = api;
const api = require('express').Router();
const { verifyJWT } = require('../middlewares/jwt.js')
const  pdfGenerate  = require('./routes/pdfGenerateRoute');
const addQuestionRouter = require('./routes/addQuestions.js');
const dropQuestionRouter = require('./routes/dropQuestion.js')
const getExpertQuestions=require('./routes/getExpertQuestion');
const getQuestionRouter = require('./routes/getQuestions.js');
const expertDetailsRouter = require('./routes/expertDetails.js');
const expertQuestionsRouter = require('./routes/getExpertQuestions.js');
const subjectProviderRouter = require('./routes/getSubjectProvider')
const freezeQuestionRouter = require('./routes/freezeQuestions');
const editQuestionRouter = require('./routes/editQuestion');
api.use('/expertQuestions',expertQuestionsRouter);
api.use('/expertDetails',verifyJWT,expertDetailsRouter);
api.use('/questions',addQuestionRouter);
api.use('/pdfGenerate',pdfGenerate);
api.use('/get-questions',getQuestionRouter);
api.use('/getExpertQuestions',verifyJWT,getExpertQuestions);
api.use('/getSubjectProvider',subjectProviderRouter)
api.use('/freezeQuestion',verifyJWT,freezeQuestionRouter)
api.use('/dropQuestion',verifyJWT,dropQuestionRouter);
api.use('/edit-question',verifyJWT,editQuestionRouter);
module.exports = api;
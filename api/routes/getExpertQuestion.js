const express=require('express');
const { getExpertQuestions } = require('../../controllers/getExpertQuestionsController');
const { verifyJWT } = require('../../middlewares/jwt');
const router=express.Router();

router.route('/').get(verifyJWT,getExpertQuestions);

module.exports=router;
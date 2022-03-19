const express=require('express');
const { pdfGenerate } = require('../../controllers/pdfGenerateController');
const router=express.Router();

router.post('/',pdfGenerate);

module.exports=router;
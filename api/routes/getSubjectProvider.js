const express=require('express');
const getSubjectModal=require('../../models/subjectProviderModal');
const router=express.Router();

router.get('/getSubjectProvider',async(req,res)=>{
    try{
         const getSubjectProvider=await getSubjectModal.find();
         res.status(200).json(getSubjectProvider);
    }catch(err){
        res.status(404).json({msg:"Internal Server Error"});
    }
})
module.exports=router;

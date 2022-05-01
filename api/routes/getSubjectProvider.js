const express=require('express');
const getSubjectModal=require('../../models/subjectProviderModal');
const router=express.Router();

router.get('/options',async(req,res)=>{
    try{
         const getSubjectProvider=await getSubjectModal.find();
        //  console.log(getSubjectProvider)
         res.status(200).json(getSubjectProvider[0]);
    }catch(err){
        res.status(500).json({msg:"Internal Server Error"});
    }
})
module.exports=router;

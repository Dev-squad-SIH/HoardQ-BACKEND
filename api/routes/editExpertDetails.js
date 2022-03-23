const editExpertDetailsRouter = require('express').Router();
const Expert = require('../../models/expert.js');
const bcrypt = require('bcrypt');

editExpertDetailsRouter.put('/email',async(req,res)=>{
    try{
        const {email} = req.body;
       const expertId = req.jwt_payload._id;
       let expert = await Expert.findById(expertId);
       if(!expert)
       return res.status(400).json({message:"Expert not found"});
       expert.email = email;
       await expert.save();
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

editExpertDetailsRouter.put('/password',async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body;
       const expertId = req.jwt_payload._id;
       let expert = await Expert.findById(expertId);
       if(!expert)
       return res.status(400).json({message:"Expert not found"});

       if (await bcrypt.compare(oldPassword, expert.password)) {
  
        const salt = await bcrypt.genSalt(10);
        expert.password = await bcrypt.hash(newPassword, salt);
        await expert.save();
        return res.status(200).json({message:"Password successfully updated"});
      }
      return res.status(400).json({message:"Password doesn't match"});
       
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).json({message:"Server error"});
    }
})

module.exports = editExpertDetailsRouter;
